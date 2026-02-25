import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResultDocument = Result & Document;

@Schema({ _id: false })
export class DomainScore {
  @Prop({ type: Types.ObjectId, ref: 'Domain', required: true })
  domainId: Types.ObjectId;

  @Prop({ required: true })
  domainName: string;

  @Prop({ required: true })
  score: number;
}

@Schema({ _id: false })
export class UserAnswer {
  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true })
  choiceIndex: number;
}

@Schema({ timestamps: true })
export class Result {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [UserAnswer], required: true })
  answers: UserAnswer[];

  @Prop({ type: [DomainScore], required: true })
  domainScores: DomainScore[];

  @Prop({ required: true })
  totalQuestions: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);