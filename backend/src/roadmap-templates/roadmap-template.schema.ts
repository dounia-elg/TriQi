import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoadmapTemplateDocument = RoadmapTemplate & Document;

@Schema({ _id: true })
export class TemplateTask {
  @Prop({ required: true })
  title: string; 

  @Prop({ required: true })
  description: string; 
}

@Schema({ _id: false })
export class TemplateWeek {
  @Prop({ required: true })
  weekNumber: number; 

  @Prop({ required: true })
  theme: string; 

  @Prop({ type: [TemplateTask], default: [] })
  tasks: TemplateTask[]; 
}

@Schema({ timestamps: true })
export class RoadmapTemplate {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId; 

  @Prop({ required: true })
  categoryName: string; 

  @Prop({ required: true, enum: [3, 6] })
  durationMonths: number; 

  @Prop({ type: [TemplateWeek], default: [] })
  weeks: TemplateWeek[];

  @Prop({ default: true })
  isActive: boolean;
}

export const RoadmapTemplateSchema = SchemaFactory.createForClass(RoadmapTemplate);
