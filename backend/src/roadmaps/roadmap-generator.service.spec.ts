import { Test, TestingModule } from '@nestjs/testing';
import { RoadmapGeneratorService } from './roadmap-generator.service';
import { RoadmapTemplatesService } from '../roadmap-templates/roadmap-templates.service';
import { TaskStatus } from './roadmap.schema';

const mockTemplatesService = {
  findByCategoryAndDuration: jest.fn(),
};

describe('RoadmapGeneratorService', () => {
  let service: RoadmapGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoadmapGeneratorService,
        { provide: RoadmapTemplatesService, useValue: mockTemplatesService },
      ],
    }).compile();

    service = module.get<RoadmapGeneratorService>(RoadmapGeneratorService);
    jest.clearAllMocks();
  });

  describe('generate — with DB template', () => {
    it('should use template from DB and return correct weeks', async () => {
      mockTemplatesService.findByCategoryAndDuration.mockResolvedValue({
        weeks: [
          {
            weekNumber: 1,
            theme: 'Découverte — {{domainName}}',
            tasks: [
              {
                title: 'Apprendre {{domainName}}',
                description: 'Introduction à {{domainName}}.',
              },
            ],
          },
        ],
      });

      const weeks = await service.generate('Informatique', 'cat123', 3);

      expect(weeks[0].theme).toBe('Découverte — Informatique');
      expect(weeks[0].tasks[0].title).toBe('Apprendre Informatique');
      expect(weeks[0].tasks[0].status).toBe(TaskStatus.PENDING);
    });
  });

  describe('generate — fallback (no template)', () => {
    it('should generate 12 weeks for 3 months when no template found', async () => {
      mockTemplatesService.findByCategoryAndDuration.mockResolvedValue(null);

      const weeks = await service.generate('Commerce', 'cat999', 3);
      expect(weeks).toHaveLength(12);
    });

    it('should generate 24 weeks for 6 months when no template found', async () => {
      mockTemplatesService.findByCategoryAndDuration.mockResolvedValue(null);

      const weeks = await service.generate('Art', 'cat999', 6);
      expect(weeks).toHaveLength(24);
    });

    it('should set all fallback tasks to PENDING', async () => {
      mockTemplatesService.findByCategoryAndDuration.mockResolvedValue(null);

      const weeks = await service.generate('Art', 'cat999', 3);
      const allTasks = weeks.flatMap((w) => w.tasks);
      allTasks.forEach((t) => expect(t.status).toBe(TaskStatus.PENDING));
    });

    it('should include domain name in fallback themes', async () => {
      mockTemplatesService.findByCategoryAndDuration.mockResolvedValue(null);

      const weeks = await service.generate('Médecine', 'cat999', 3);
      weeks.forEach((w) => expect(w.theme).toContain('Médecine'));
    });
  });
});
