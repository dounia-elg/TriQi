import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution, InstitutionDocument } from './institution.schema';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { DomainsService } from '../domains/domains.service';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
    private domainsService: DomainsService,
  ) {}

  private async validateDomainIds(domainIds: string[]): Promise<void> {
    for (const id of domainIds) {
      try {
        await this.domainsService.findOne(id);
      } catch {
        throw new BadRequestException(
          `Domain with id "${id}" does not exist. Please provide valid domain IDs.`,
        );
      }
    }
  }

  async create(dto: CreateInstitutionDto): Promise<InstitutionDocument> {
    if (dto.domainIds && dto.domainIds.length > 0) {
      await this.validateDomainIds(dto.domainIds);
    }
    const institution = new this.institutionModel(dto);
    return institution.save();
  }

  async findAll(): Promise<InstitutionDocument[]> {
    return this.institutionModel.find({ isActive: true });
  }
  async findAllAdmin(): Promise<InstitutionDocument[]> {
    return this.institutionModel.find();
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

  async update(
    id: string,
    dto: UpdateInstitutionDto,
  ): Promise<InstitutionDocument> {
    if (dto.domainIds && dto.domainIds.length > 0) {
      await this.validateDomainIds(dto.domainIds);
    }
    const institution = await this.institutionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
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