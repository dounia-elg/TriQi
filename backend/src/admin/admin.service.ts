import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { QuestionsService } from '../questions/questions.service';
import { DomainsService } from '../domains/domains.service';
import { InstitutionsService } from '../institutions/institutions.service';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private questionsService: QuestionsService,
    private domainsService: DomainsService,
    private institutionsService: InstitutionsService,
  ) {}

  async getDashboardStats() {
    const [totalUsers, activeQuestions, definedDomains, eliteInstitutions] =
      await Promise.all([
        this.usersService.count(),
        this.questionsService.countActive(),
        this.domainsService.count(),
        this.institutionsService.countActive(),
      ]);

    return {
      totalUsers,
      activeQuestions,
      definedDomains,
      eliteInstitutions,
    };
  }
}
