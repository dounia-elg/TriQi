import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoadmapTemplatesService } from './roadmap-templates.service';
import { RoadmapTemplatesController } from './roadmap-templates.controller';
import {
  RoadmapTemplate,
  RoadmapTemplateSchema,
} from './roadmap-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoadmapTemplate.name, schema: RoadmapTemplateSchema },
    ]),
  ],
  controllers: [RoadmapTemplatesController],
  providers: [RoadmapTemplatesService],
  exports: [RoadmapTemplatesService],
})
export class RoadmapTemplatesModule {}
