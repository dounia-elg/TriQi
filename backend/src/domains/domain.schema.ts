import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DomainDocument = Domain & Document;

@Schema({ timestamps: true })
export class Domain {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ default: true })  
  isActive: boolean;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);