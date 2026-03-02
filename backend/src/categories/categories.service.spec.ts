import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { Category } from './category.schema';

const mockCategory = {
  _id: 'cat123',
  name: 'Technologie',
  description: 'Domaines liés à la tech',
};

const mockCategoryModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw ConflictException if name already exists', async () => {
      mockCategoryModel.findOne.mockResolvedValue(mockCategory);

      await expect(
        service.create({ name: 'Technologie' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all categories sorted by name', async () => {
      mockCategoryModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([mockCategory]),
      });

      const result = await service.findAll();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoryModel.findById.mockResolvedValue(mockCategory);
      const result = await service.findOne('cat123');
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if not found', async () => {
      mockCategoryModel.findById.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the category', async () => {
      mockCategoryModel.findOne.mockResolvedValue(null);
      mockCategoryModel.findByIdAndUpdate.mockResolvedValue({
        ...mockCategory,
        name: 'Sciences',
      });

      const result = await service.update('cat123', { name: 'Sciences' });
      expect(result.name).toBe('Sciences');
    });

    it('should throw ConflictException if new name already exists', async () => {
      mockCategoryModel.findOne.mockResolvedValue({ name: 'Commerce' });

      await expect(
        service.update('cat123', { name: 'Commerce' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should delete and return success message', async () => {
      mockCategoryModel.findByIdAndDelete.mockResolvedValue(mockCategory);
      const result = await service.remove('cat123');
      expect(result).toEqual({ message: 'Category deleted successfully' });
    });

    it('should throw NotFoundException if not found', async () => {
      mockCategoryModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});
