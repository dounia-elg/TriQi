import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { DomainsService } from './domains.service';
import { Domain } from './domain.schema';

const mockDomain = {
  _id: 'domain123',
  name: 'Informatique',
  description: 'Sciences du numérique',
  category: 'Informatique',
  skills: ['Problem solving', 'Coding'],
  isActive: true,
};

const mockDomainModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
};

describe('DomainsService', () => {
  let service: DomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainsService,
        {
          provide: getModelToken(Domain.name),
          useValue: {
            ...mockDomainModel,
            new: jest.fn().mockResolvedValue(mockDomain),
            constructor: jest.fn().mockResolvedValue(mockDomain),
          },
        },
      ],
    }).compile();

    service = module.get<DomainsService>(DomainsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of domains', async () => {
      mockDomainModel.find.mockResolvedValue([mockDomain]);
      const result = await service.findAll();
      expect(result).toEqual([mockDomain]);
      expect(mockDomainModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a domain by id', async () => {
      mockDomainModel.findById.mockResolvedValue(mockDomain);
      const result = await service.findOne('domain123');
      expect(result).toEqual(mockDomain);
    });

    it('should throw NotFoundException if domain not found', async () => {
      mockDomainModel.findById.mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the domain', async () => {
      const updated = { ...mockDomain, name: 'Commerce' };
      mockDomainModel.findByIdAndUpdate.mockResolvedValue(updated);
      const result = await service.update('domain123', { name: 'Commerce' });
      expect(result.name).toBe('Commerce');
    });

    it('should throw NotFoundException if domain not found', async () => {
      mockDomainModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(service.update('bad-id', { name: 'X' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return success message', async () => {
      mockDomainModel.findByIdAndDelete.mockResolvedValue(mockDomain);
      const result = await service.remove('domain123');
      expect(result).toEqual({ message: 'Domain deleted successfully' });
    });

    it('should throw NotFoundException if domain not found', async () => {
      mockDomainModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});