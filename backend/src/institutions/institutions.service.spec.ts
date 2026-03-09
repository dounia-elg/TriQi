import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { InstitutionsService } from './institutions.service';
import { Institution } from './institution.schema';

const mockInstitution = {
  _id: 'inst123',
  name: 'Université Mohammed V',
  type: 'university',
  country: 'Maroc',
  city: 'Rabat',
  domainIds: ['domain1', 'domain2'],
  programs: ['Génie Informatique', 'Data Science'],
  isActive: true,
};

const mockInstitutionModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('InstitutionsService', () => {
  let service: InstitutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionsService,
        {
          provide: getModelToken(Institution.name),
          useValue: mockInstitutionModel,
        },
      ],
    }).compile();

    service = module.get<InstitutionsService>(InstitutionsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return only active institutions', async () => {
      mockInstitutionModel.find.mockResolvedValue([mockInstitution]);
      const result = await service.findAll();
      expect(result).toEqual([mockInstitution]);
      expect(mockInstitutionModel.find).toHaveBeenCalledWith({ isActive: true });
    });
  });

  describe('findOne', () => {
    it('should return an institution by id', async () => {
      mockInstitutionModel.findById.mockResolvedValue(mockInstitution);
      const result = await service.findOne('inst123');
      expect(result).toEqual(mockInstitution);
    });

    it('should throw NotFoundException if not found', async () => {
      mockInstitutionModel.findById.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByDomains', () => {
    it('should return institutions matching at least one domain', async () => {
      mockInstitutionModel.find.mockResolvedValue([mockInstitution]);
      const result = await service.findByDomains(['domain1']);
      expect(result).toEqual([mockInstitution]);
      expect(mockInstitutionModel.find).toHaveBeenCalledWith({
        domainIds: { $in: ['domain1'] },
        isActive: true,
      });
    });
  });

  describe('update', () => {
    it('should update and return the institution', async () => {
      const updated = { ...mockInstitution, city: 'Casablanca' };
      mockInstitutionModel.findByIdAndUpdate.mockResolvedValue(updated);
      const result = await service.update('inst123', { city: 'Casablanca' });
      expect(result.city).toBe('Casablanca');
    });

    it('should throw NotFoundException if not found', async () => {
      mockInstitutionModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(service.update('bad-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return success message', async () => {
      mockInstitutionModel.findByIdAndDelete.mockResolvedValue(mockInstitution);
      const result = await service.remove('inst123');
      expect(result).toEqual({ message: 'Institution deleted successfully' });
    });

    it('should throw NotFoundException if not found', async () => {
      mockInstitutionModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});
