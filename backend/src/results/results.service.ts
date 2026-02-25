import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Result, ResultDocument } from './result.schema';
import { SubmitTestDto } from './dto/submit-test.dto';
import { ScoringService } from './scoring.service';
import { QuestionsService } from '../questions/questions.service';
import { DomainsService } from '../domains/domains.service';
import { ExplanationService } from './explanation.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result.name)
    private resultModel: Model<ResultDocument>,
    private scoringService: ScoringService,
    private questionsService: QuestionsService,
    private domainsService: DomainsService,
    private explanationService: ExplanationService,
  ) {}

  async submitTest(userId: string, dto: SubmitTestDto) {
    const questions = await this.questionsService.findAll();

    const domains = await this.domainsService.findAll();

    const domainScores = this.scoringService.calculateScores(
      dto.answers,
      questions,
      domains,
    );

    const explanations = this.explanationService.generateExplanations(domainScores, 3);

    const result = new this.resultModel({
      userId: new Types.ObjectId(userId),
      answers: dto.answers.map((a) => ({
        questionId: new Types.ObjectId(a.questionId),
        choiceIndex: a.choiceIndex,
      })),
      domainScores,
      explanations,
      totalQuestions: dto.answers.length,
    });

    return result.save();
  }

  async findByUser(userId: string): Promise<ResultDocument[]> {
    return this.resultModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  }

  async findLatestByUser(userId: string): Promise<ResultDocument | null> {
    return this.resultModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  }
}