import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution, InstitutionDocument } from './institution.schema';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
  ) {}

  async create(dto: CreateInstitutionDto): Promise<InstitutionDocument> {
    const institution = new this.institutionModel(dto);
    return institution.save();
  }

  async findAll(): Promise<InstitutionDocument[]> {
    return this.institutionModel.find({ isActive: true });
  }

  async findOne(id: string): Promise<InstitutionDocument> {
    const institution = await this.institutionModel.findById(id);
    if (!institution) {
      throw new NotFoundException(`Institution with id "${id}" not found`);
    }
    return institution;
  }


  async findByDomains(domainIds: string[]): Promise<InstitutionDocument[]> {
    return this.institutionModel.find({
      domainIds: { $in: domainIds },
      isActive: true,
    });
  }

  async update(id: string, dto: UpdateInstitutionDto): Promise<InstitutionDocument> {
    const institution = await this.institutionModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );
    if (!institution) {
      throw new NotFoundException(`Institution with id "${id}" not found`);
    }
    return institution;
  }

  async remove(id: string): Promise<{ message: string }> {
    const institution = await this.institutionModel.findByIdAndDelete(id);
    if (!institution) {
      throw new NotFoundException(`Institution with id "${id}" not found`);
    }
    return { message: 'Institution deleted successfully' };
  }
}
