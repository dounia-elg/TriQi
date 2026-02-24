import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain, DomainDocument } from './domain.schema';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Injectable()
export class DomainsService {
  constructor(
    @InjectModel(Domain.name)
    private domainModel: Model<DomainDocument>,
  ) {}

  async create(dto: CreateDomainDto): Promise<DomainDocument> {
    const domain = new this.domainModel(dto);
    return domain.save();
  }

  async findAll(): Promise<DomainDocument[]> {
    return this.domainModel.find();
  }

  async findOne(id: string): Promise<DomainDocument> {
    const domain = await this.domainModel.findById(id);
    if (!domain) {
      throw new NotFoundException(`Domain with id "${id}" not found`);
    }
    return domain;
  }

  async update(id: string, dto: UpdateDomainDto): Promise<DomainDocument> {
    const domain = await this.domainModel.findByIdAndUpdate(
      id,
      dto,
      { new: true }, 
    );
    if (!domain) {
      throw new NotFoundException(`Domain with id "${id}" not found`);
    }
    return domain;
  }

  async remove(id: string): Promise<{ message: string }> {
    const domain = await this.domainModel.findByIdAndDelete(id);
    if (!domain) {
      throw new NotFoundException(`Domain with id "${id}" not found`);
    }
    return { message: 'Domain deleted successfully' };
  }
}