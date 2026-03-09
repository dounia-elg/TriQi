import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { InstitutionsService } from './institutions.service';
import { Institution } from './institution.schema';
import { DomainsService } from '../domains/domains.service';

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

const mockDomainsService = {
  findOne: jest.fn(),
};

describe('InstitutionsService', () => {
  let service: InstitutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionsService,
        { provide: getModelToken(Institution.name), useValue: mockInstitutionModel },
        { provide: DomainsService, useValue: mockDomainsService },
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

  describe('findAllAdmin', () => {
    it('should return all institutions including inactive', async () => {
      mockInstitutionModel.find.mockResolvedValue([mockInstitution]);
      const result = await service.findAllAdmin();
      expect(result).toEqual([mockInstitution]);
      expect(mockInstitutionModel.find).toHaveBeenCalledWith();
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

  describe('create — domainIds validation', () => {
    it('should throw BadRequestException if a domainId does not exist', async () => {
      mockDomainsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(
        service.create({
          name: 'Test School',
          type: 'school',
          country: 'Maroc',
          city: 'Casablanca',
          domainIds: ['invalid-domain-id'],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update and return the institution', async () => {
      mockDomainsService.findOne.mockResolvedValue({ _id: 'domain1' });
      const updated = { ...mockInstitution, city: 'Casablanca' };
      mockInstitutionModel.findByIdAndUpdate.mockResolvedValue(updated);
      const result = await service.update('inst123', { city: 'Casablanca' });
      expect(result.city).toBe('Casablanca');
    });

    it('should throw NotFoundException if institution not found', async () => {
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
