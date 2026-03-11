import { Body,Controller,Delete,Get,Param,Patch,Post,Query,UseGuards } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/role.enum';
import { RecommendationQueryDto } from './dto/recommendation-query.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SuggestInstitutionsDto } from './dto/suggest-institutions.dto';
import { InstitutionsAIService } from './institutions-ai.service'; 

@Controller('institutions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InstitutionsController {
  constructor(private institutionsService: InstitutionsService, private institutionsAIService: InstitutionsAIService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateInstitutionDto) {
    return this.institutionsService.create(dto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  findAllAdmin() {
    return this.institutionsService.findAllAdmin();
  }

  @Get('recommended')
  @Roles(Role.USER, Role.ADMIN)
  findRecommended(
    @Query() query: RecommendationQueryDto,
    @GetUser() user: any, 
  ) {
    return this.institutionsService.findRecommended(
      user.id, 
      query.domainIds, 
      query.country, 
      query.city
    );
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateInstitutionDto) {
    return this.institutionsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(id);
  }

  @Post('admin/suggest')
  @Roles(Role.ADMIN) 
  suggestInstitutions(@Body() dto: SuggestInstitutionsDto) {
    return this.institutionsAIService.suggestInstitutions(dto.domain, dto.country);
  }
}
