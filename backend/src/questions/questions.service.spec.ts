import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { Question } from './question.schema';

const mockQuestion = {
  _id: 'q123',
  text: 'Qu\'activité préfères-tu ?',
  category: 'interests',
  isActive: true,
  choices: [
    {
      text: 'Résoudre des problèmes logiques',
      weights: [{ domainId: 'domain1', weight: 4 }],
    },
    {
      text: 'Créer des œuvres artistiques',
      weights: [{ domainId: 'domain2', weight: 4 }],
    },
  ],
};

const mockQuestionModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getModelToken(Question.name),
          useValue: mockQuestionModel,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return only active questions', async () => {
      mockQuestionModel.find.mockResolvedValue([mockQuestion]);
      const result = await service.findAll();
      expect(result).toEqual([mockQuestion]);
      expect(mockQuestionModel.find).toHaveBeenCalledWith({ isActive: true });
    });
  });

  describe('findOne', () => {
    it('should return a question by id', async () => {
      mockQuestionModel.findById.mockResolvedValue(mockQuestion);
      const result = await service.findOne('q123');
      expect(result).toEqual(mockQuestion);
    });

    it('should throw NotFoundException if not found', async () => {
      mockQuestionModel.findById.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the question', async () => {
      const updated = { ...mockQuestion, text: 'Updated question?' };
      mockQuestionModel.findByIdAndUpdate.mockResolvedValue(updated);
      const result = await service.update('q123', { text: 'Updated question?' });
      expect(result.text).toBe('Updated question?');
    });

    it('should throw NotFoundException if not found', async () => {
      mockQuestionModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(service.update('bad-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return success message', async () => {
      mockQuestionModel.findByIdAndDelete.mockResolvedValue(mockQuestion);
      const result = await service.remove('q123');
      expect(result).toEqual({ message: 'Question deleted successfully' });
    });

    it('should throw NotFoundException if not found', async () => {
      mockQuestionModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});