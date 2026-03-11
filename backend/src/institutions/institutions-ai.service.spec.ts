import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionsAIService } from './institutions-ai.service';
import { AiService } from '../ai/ai.service';

describe('InstitutionsAIService', () => {
  let service: InstitutionsAIService;
  let aiService: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionsAIService,
        {
          provide: AiService,
          useValue: { 
            generateInstitutionInsights: jest.fn(),
            generateSuggestions: jest.fn() 
          },
        },
      ],
    }).compile();

    service = module.get<InstitutionsAIService>(InstitutionsAIService);
    aiService = module.get<AiService>(AiService);
  });

  it('should build the correct prompt using user scores', async () => {
    const mockInst = { 
        name: 'Polytechnique', 
        type: 'school', 
        programs: ['Math'], 
        city: 'Paris', 
        country: 'France' 
    } as any;
    const mockScores = [{ domainName: 'Science', score: 95 }];
    
    await service.generateInsights(mockInst, mockScores);

    expect(aiService.generateInstitutionInsights).toHaveBeenCalledWith(
        expect.stringContaining('Polytechnique')
    );
    expect(aiService.generateInstitutionInsights).toHaveBeenCalledWith(
        expect.stringContaining('Science: 95')
    );
  });

  it('should generate admin suggestions', async () => {
    await service.suggestInstitutions('IT', 'Morocco');
    expect(aiService.generateSuggestions).toHaveBeenCalledWith(
        expect.stringContaining('IT')
    );
  });
});
