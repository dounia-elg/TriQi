import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { InstitutionsService } from './institutions.service';
import { Institution } from './institution.schema';
import { DomainsService } from '../domains/domains.service';
import { RecommendationService } from './recommendation.service';
import { ResultsService } from '../results/results.service';
import { InstitutionsAIService } from './institutions-ai.service';

const mockInstitution = {
    _id: 'inst123',
    name: 'Université Mohammed V',
    type: 'university',
    country: 'Maroc',
    city: 'Rabat',
    domainIds: ['domain1'],
    programs: ['IT'],
    isActive: true,
    toObject: jest.fn().mockReturnThis(),
};

const mockInstitutionModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
};

function MockModel(dto: any) {
    this.name = dto.name;
    this.save = jest.fn().mockResolvedValue({ ...dto, _id: 'new_id' });
}

const mockDomainsService = {
    findOne: jest.fn(),
};

const mockRecommendationService = {
    rank: jest.fn((institutions) => institutions), 
};

const mockResultsService = {
    findLatestByUser: jest.fn(),
};

const mockInstitutionsAIService = {
    generateInsights: jest.fn().mockResolvedValue({
        explanation: 'AI explanation',
        advice: ['Tip 1'],
    }),
};

describe('InstitutionsService', () => {
    let service: InstitutionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InstitutionsService,
                { provide: getModelToken(Institution.name), useValue: mockInstitutionModel },
                { provide: DomainsService, useValue: mockDomainsService },
                { provide: RecommendationService, useValue: mockRecommendationService },
                { provide: ResultsService, useValue: mockResultsService },
                { provide: InstitutionsAIService, useValue: mockInstitutionsAIService },
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

    describe('findRecommended', () => {
        it('should return institutions with AI insights', async () => {
            mockInstitutionModel.find.mockResolvedValue([mockInstitution]);
            mockResultsService.findLatestByUser.mockResolvedValue({ domainScores: [] });

            const result = await service.findRecommended('user123');

            expect(result[0]).toHaveProperty('aiExplanation', 'AI explanation');
            expect(result[0]).toHaveProperty('aiAdvice');
            expect(mockInstitutionsAIService.generateInsights).toHaveBeenCalled();
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

    describe('create', () => {
        it('should throw BadRequestException if a domainId does not exist', async () => {
            mockDomainsService.findOne.mockRejectedValue(new NotFoundException());
            await expect(
                service.create({
                    name: 'Test',
                    type: 'school',
                    country: 'Maroc',
                    city: 'Casa',
                    domainIds: ['invalid'],
                }),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update and return the institution', async () => {
            mockDomainsService.findOne.mockResolvedValue({ _id: 'domain1' });
            mockInstitutionModel.findByIdAndUpdate.mockResolvedValue({ ...mockInstitution, city: 'Casa' });
            const result = await service.update('inst123', { city: 'Casa' });
            expect(result.city).toBe('Casa');
        });
    });

    describe('remove', () => {
        it('should delete and return success message', async () => {
            mockInstitutionModel.findByIdAndDelete.mockResolvedValue(mockInstitution);
            const result = await service.remove('inst123');
            expect(result).toEqual({ message: 'Institution deleted successfully' });
        });
    });
});
