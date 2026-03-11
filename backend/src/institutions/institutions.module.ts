import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionsService } from './institutions.service';
import { Institution, InstitutionSchema } from './institution.schema';
import { InstitutionsController } from './institutions.controller';
import { DomainsModule } from '../domains/domains.module';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
    DomainsModule,
  ],
  controllers: [InstitutionsController],
  providers: [InstitutionsService, RecommendationService],
  exports: [InstitutionsService],
})
export class InstitutionsModule { }
