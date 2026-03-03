import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoadmapDocument = Roadmap & Document;

export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
}

@Schema({ _id: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop()
  tip?: string;
}
@Schema({ _id: false })
export class Week {
  @Prop({ required: true })
  weekNumber: number;

  @Prop({ required: true })
  theme: string;

  @Prop({ type: [Task], default: [] })
  tasks: Task[];
}

@Schema({ timestamps: true })
export class Roadmap {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Result', required: true })
  resultId: Types.ObjectId;

  @Prop({ type: [String], required: true })
  topDomains: string[];

  @Prop({ required: true, enum: [3, 6] })
  durationMonths: number;

  @Prop({ type: [Week], default: [] })
  weeks: Week[];

  @Prop({ default: 0 })
  progressPercent: number;

  @Prop({ default: false })
  isEnriched: boolean;
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
