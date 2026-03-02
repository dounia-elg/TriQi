import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { RoadmapTemplatesService } from './roadmap-templates.service';
import { RoadmapTemplate } from './roadmap-template.schema';

const mockTemplate = {
  _id: 'tpl123',
  categoryId: 'cat123',
  categoryName: 'Technologie',
  durationMonths: 3,
  isActive: true,
  weeks: [
    {
      weekNumber: 1,
      theme: 'Découverte & bases',
      tasks: [
        { title: 'Apprendre Python', description: 'Suivre un cours intro.' },
      ],
    },
  ],
};

const mockTemplateModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('RoadmapTemplatesService', () => {
  let service: RoadmapTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoadmapTemplatesService,
        {
          provide: getModelToken(RoadmapTemplate.name),
          useValue: mockTemplateModel,
        },
      ],
    }).compile();

    service = module.get<RoadmapTemplatesService>(RoadmapTemplatesService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all templates sorted', async () => {
      mockTemplateModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([mockTemplate]),
      });
      const result = await service.findAll();
      expect(result).toEqual([mockTemplate]);
    });
  });

  describe('findOne', () => {
    it('should return a template by id', async () => {
      mockTemplateModel.findById.mockResolvedValue(mockTemplate);
      const result = await service.findOne('tpl123');
      expect(result).toEqual(mockTemplate);
    });

    it('should throw NotFoundException if not found', async () => {
      mockTemplateModel.findById.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCategoryAndDuration', () => {
    it('should return a template matching category + duration', async () => {
      mockTemplateModel.findOne.mockResolvedValue(mockTemplate);
      const result = await service.findByCategoryAndDuration('cat123', 3);
      expect(result).toEqual(mockTemplate);
      expect(mockTemplateModel.findOne).toHaveBeenCalledWith({
        categoryId: 'cat123',
        durationMonths: 3,
        isActive: true,
      });
    });

    it('should return null if no template found', async () => {
      mockTemplateModel.findOne.mockResolvedValue(null);
      const result = await service.findByCategoryAndDuration('cat999', 3);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the template', async () => {
      const updated = { ...mockTemplate, durationMonths: 6 };
      mockTemplateModel.findByIdAndUpdate.mockResolvedValue(updated);
      const result = await service.update('tpl123', { durationMonths: 6 });
      expect(result.durationMonths).toBe(6);
    });

    it('should throw NotFoundException if not found', async () => {
      mockTemplateModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(service.update('bad-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return success message', async () => {
      mockTemplateModel.findByIdAndDelete.mockResolvedValue(mockTemplate);
      const result = await service.remove('tpl123');
      expect(result).toEqual({ message: 'RoadmapTemplate deleted successfully' });
    });

    it('should throw NotFoundException if not found', async () => {
      mockTemplateModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});
