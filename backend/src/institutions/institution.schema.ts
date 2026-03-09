import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InstitutionDocument = Institution & Document;

@Schema({ timestamps: true })
export class Institution {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: String,
    enum: ['university', 'school', 'center'],
  })
  type: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  website?: string;

  @Prop()
  description?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Domain', default: [] })
  domainIds: Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  programs: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
