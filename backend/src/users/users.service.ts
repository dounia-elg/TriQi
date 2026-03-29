import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
  
  async create(data: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async markTestCompleted(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      hasCompletedTest: true,
      lastTestAt: new Date(),
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const update: Record<string, string> = {};
    for (const [key, value] of Object.entries(dto) as [keyof UpdateProfileDto, string | undefined][]) {
      if (value !== undefined && value !== '') {
        update[key as string] = value;
      }
    }

    const updated = await this.userModel
      .findByIdAndUpdate(userId, { $set: update }, { new: true, runValidators: true })
      .select('-password')
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException('User not found.');
    }

    return {
      id: String(updated._id),
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      role: updated.role,
      educationLevel: updated.educationLevel,
      ageRange: updated.ageRange,
      city: updated.city,
      goal: updated.goal,
      language: updated.language,
      hasCompletedTest: updated.hasCompletedTest,
    };
  }
}