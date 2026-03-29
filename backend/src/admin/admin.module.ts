import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { QuestionsModule } from '../questions/questions.module';
import { DomainsModule } from '../domains/domains.module';
import { InstitutionsModule } from '../institutions/institutions.module';

@Module({
  imports: [UsersModule, QuestionsModule, DomainsModule, InstitutionsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
