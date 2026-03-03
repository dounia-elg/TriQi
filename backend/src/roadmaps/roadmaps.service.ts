import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Roadmap, RoadmapDocument, TaskStatus } from './roadmap.schema';
import { GenerateRoadmapDto } from './dto/generate-roadmap.dto';
import { RoadmapGeneratorService } from './roadmap-generator.service';
import { ResultsService } from '../results/results.service';
import { DomainsService } from '../domains/domains.service';

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectModel(Roadmap.name)
    private roadmapModel: Model<RoadmapDocument>,
    private generatorService: RoadmapGeneratorService,
    private resultsService: ResultsService,
    private domainsService: DomainsService,
  ) {}

  async generateForUser(
    userId: string,
    dto: GenerateRoadmapDto,
  ): Promise<RoadmapDocument> {
    const durationMonths = dto.durationMonths ?? 3;

    const latestResult = await this.resultsService.findLatestByUser(userId);
    if (!latestResult) {
      throw new BadRequestException(
        'Complete the orientation test before generating a roadmap.',
      );
    }

    const topDomainScore = latestResult.domainScores[0];
    if (!topDomainScore) {
      throw new BadRequestException('No domain scores found in your result.');
    }
    const domain = await this.domainsService.findOne(
      topDomainScore.domainId.toString(),
    );

    const categoryId = domain.categoryId.toString();
    const topDomainName = topDomainScore.domainName;
    const topDomains = latestResult.domainScores
      .slice(0, 3)
      .map((d) => d.domainName);

    const weeks = await this.generatorService.generate(
      topDomainName,
      categoryId,
      durationMonths,
    );

    const roadmap = new this.roadmapModel({
      userId: new Types.ObjectId(userId),
      resultId: latestResult._id,
      topDomains,
      durationMonths,
      weeks,
      progressPercent: 0,
    });

    return roadmap.save();
  }

  async findByUser(userId: string): Promise<RoadmapDocument | null> {
    return this.roadmapModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  }

  async updateTaskStatus(
    userId: string,
    taskId: string,
    status: TaskStatus,
  ): Promise<RoadmapDocument> {
    const roadmap = await this.roadmapModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        'weeks.tasks._id': new Types.ObjectId(taskId),
      },
      { $set: { 'weeks.$[].tasks.$[task].status': status } },
      {
        arrayFilters: [{ 'task._id': new Types.ObjectId(taskId) }],
        new: true,
      },
    );

    if (!roadmap) {
      throw new NotFoundException('Roadmap or task not found.');
    }

    const allTasks = roadmap.weeks.flatMap((w) => w.tasks);
    const done = allTasks.filter((t) => t.status === TaskStatus.DONE).length;
    roadmap.progressPercent = Math.round((done / allTasks.length) * 100);

    return roadmap.save();
  }
}
