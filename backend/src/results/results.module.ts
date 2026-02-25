import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { ScoringService } from './scoring.service';
import { Result, ResultSchema } from './result.schema';
import { QuestionsModule } from '../questions/questions.module';
import { DomainsModule } from '../domains/domains.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Result.name, schema: ResultSchema },
    ]),
    QuestionsModule,
    DomainsModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService, ScoringService],
  exports: [ResultsService],
})
export class ResultsModule {}