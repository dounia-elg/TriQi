import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoadmapsService } from './roadmaps.service';
import { RoadmapsController } from './roadmaps.controller';
import { RoadmapGeneratorService } from './roadmap-generator.service';
import { Roadmap, RoadmapSchema } from './roadmap.schema';
import { ResultsModule } from '../results/results.module';
import { DomainsModule } from '../domains/domains.module';
import { RoadmapTemplatesModule } from '../roadmap-templates/roadmap-templates.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roadmap.name, schema: RoadmapSchema },
    ]),
    ResultsModule,       
    DomainsModule,       
    RoadmapTemplatesModule, 
  ],
  controllers: [RoadmapsController],
  providers: [RoadmapsService, RoadmapGeneratorService],
  exports: [RoadmapsService],
})
export class RoadmapsModule {}
