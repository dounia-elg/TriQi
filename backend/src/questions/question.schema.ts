import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ _id: false }) 
export class DomainWeight {
  @Prop({ type: Types.ObjectId, ref: 'Domain', required: true })
  domainId: Types.ObjectId; 

  @Prop({ required: true, min: 0, max: 5 })
  weight: number; 
}

@Schema({ _id: false })
export class Choice {
  @Prop({ required: true })
  text: string;             

  @Prop({ type: [DomainWeight], default: [] })
  weights: DomainWeight[]; 
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  text: string; 

  @Prop({
    type: String,
    enum: ['interests', 'personality', 'abilities'],
    required: true,
  })
  category: string; 

  @Prop({ type: [Choice], required: true })
  choices: Choice[]; 

  @Prop({ default: true })
  isActive: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);