import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionsService } from './institutions.service';
import { Institution, InstitutionSchema } from './institution.schema';
import { InstitutionsController } from './institutions.controller';
import { DomainsModule } from '../domains/domains.module';
import { RecommendationService } from './recommendation.service';
import { AiModule } from '../ai/ai.module'; 
import { ResultsModule } from '../results/results.module'; 
import { InstitutionsAIService } from './institutions-ai.service'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
    DomainsModule,
    AiModule,
    ResultsModule,

  ],
  controllers: [InstitutionsController],
  providers: [InstitutionsService, RecommendationService, InstitutionsAIService],
  exports: [InstitutionsService],
})
export class InstitutionsModule { }
