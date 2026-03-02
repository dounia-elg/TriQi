import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoadmapTemplate, RoadmapTemplateDocument } from './roadmap-template.schema';
import { CreateRoadmapTemplateDto } from './dto/create-roadmap-template.dto';
import { UpdateRoadmapTemplateDto } from './dto/update-roadmap-template.dto';

@Injectable()
export class RoadmapTemplatesService {
  constructor(
    @InjectModel(RoadmapTemplate.name)
    private templateModel: Model<RoadmapTemplateDocument>,
  ) {}

  async create(dto: CreateRoadmapTemplateDto): Promise<RoadmapTemplateDocument> {
    const template = new this.templateModel(dto);
    return template.save();
  }

  async findAll(): Promise<RoadmapTemplateDocument[]> {
    return this.templateModel.find().sort({ categoryName: 1, durationMonths: 1 });
  }

  async findOne(id: string): Promise<RoadmapTemplateDocument> {
    const template = await this.templateModel.findById(id);
    if (!template) {
      throw new NotFoundException(`RoadmapTemplate with id "${id}" not found.`);
    }
    return template;
  }

  async findByCategoryAndDuration(
    categoryId: string,
    durationMonths: number,
  ): Promise<RoadmapTemplateDocument | null> {
    return this.templateModel.findOne({
      categoryId,
      durationMonths,
      isActive: true,
    });
  }

  async update(
    id: string,
    dto: UpdateRoadmapTemplateDto,
  ): Promise<RoadmapTemplateDocument> {
    const template = await this.templateModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!template) {
      throw new NotFoundException(`RoadmapTemplate with id "${id}" not found.`);
    }
    return template;
  }
  
  async remove(id: string): Promise<{ message: string }> {
    const template = await this.templateModel.findByIdAndDelete(id);
    if (!template) {
      throw new NotFoundException(`RoadmapTemplate with id "${id}" not found.`);
    }
    return { message: 'RoadmapTemplate deleted successfully' };
  }
}
