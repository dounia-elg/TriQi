import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({
    type: String,
    default: 'fr',
  })
  language: string;

  @Prop({ required: true })
  educationLevel: string; 
  

  @Prop({ required: true })
  ageRange: string; 
  

  @Prop()
  city?: string;

  @Prop()
  goal?: string; 
 

  @Prop({ default: false })
  hasCompletedTest: boolean;

  @Prop()
  lastTestAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);