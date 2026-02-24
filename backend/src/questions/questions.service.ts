import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<QuestionDocument> {
    const question = new this.questionModel(dto);
    return question.save();
  }

  async findAll(): Promise<QuestionDocument[]> {
    return this.questionModel.find({ isActive: true });
  }
  async findAllAdmin(): Promise<QuestionDocument[]> {
    return this.questionModel.find();
  }

  async findOne(id: string): Promise<QuestionDocument> {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with id "${id}" not found`);
    }
    return question;
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<QuestionDocument> {
    const question = await this.questionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!question) {
      throw new NotFoundException(`Question with id "${id}" not found`);
    }
    return question;
  }

  async remove(id: string): Promise<{ message: string }> {
    const question = await this.questionModel.findByIdAndDelete(id);
    if (!question) {
      throw new NotFoundException(`Question with id "${id}" not found`);
    }
    return { message: 'Question deleted successfully' };
  }
}