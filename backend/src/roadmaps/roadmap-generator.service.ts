import { Injectable, Logger } from '@nestjs/common';
import { RoadmapTemplatesService } from '../roadmap-templates/roadmap-templates.service';
import { Week, Task, TaskStatus } from './roadmap.schema';

@Injectable()
export class RoadmapGeneratorService {
  private readonly logger = new Logger(RoadmapGeneratorService.name);

  constructor(private templatesService: RoadmapTemplatesService) {}

  async generate(
    topDomainName: string,   
    categoryId: string,      
    durationMonths: 3 | 6,
  ): Promise<Week[]> {

    const template = await this.templatesService.findByCategoryAndDuration(
      categoryId,
      durationMonths,
    );

    if (template) {
      this.logger.log(`Template found for category "${categoryId}" — using DB template.`);
      return this.buildFromTemplate(template.weeks, topDomainName);
    }

    this.logger.warn(`No template found for category "${categoryId}" — using fallback.`);
    return this.buildFallback(topDomainName, durationMonths);
  }
  private buildFromTemplate(
    templateWeeks: { weekNumber: number; theme: string; tasks: { title: string; description: string }[] }[],
    domainName: string,
  ): Week[] {
    return templateWeeks.map((tw) => ({
      weekNumber: tw.weekNumber,
      theme: tw.theme.replace(/\{\{domainName\}\}/g, domainName),
      tasks: tw.tasks.map((t) => ({
        title: t.title.replace(/\{\{domainName\}\}/g, domainName),
        description: t.description.replace(/\{\{domainName\}\}/g, domainName),
        status: TaskStatus.PENDING,
      } as Task)),
    } as Week));
  }

  private buildFallback(domainName: string, durationMonths: number): Week[] {
    const totalWeeks = durationMonths * 4;
    const phases = [
      'Découverte & bases',
      'Approfondissement',
      'Pratique & exercices',
      'Projet concret',
      'Portfolio & bilan',
      'Consolidation',
    ];

    const fallbackTasks = [
      { title: `Explorer ${domainName}`, description: `Lire 3 articles d'introduction sur ${domainName}.` },
      { title: `Trouver tes ressources`, description: `Lister 5 livres ou cours en ligne sur ${domainName}.` },
      { title: `Définir tes objectifs`, description: `Écrire 3 objectifs SMART pour ${domainName}.` },
      { title: `Rejoindre une communauté`, description: `Trouver un groupe ou forum dédié à ${domainName}.` },
      { title: `Réaliser un mini-projet`, description: `Créer un projet concret pour pratiquer ${domainName}.` },
      { title: `Bilan et suite`, description: `Évaluer ta progression et planifier les prochains mois.` },
    ];

    const weeks: Week[] = [];
    for (let w = 1; w <= totalWeeks; w++) {
      const phaseIndex = Math.floor(((w - 1) / totalWeeks) * phases.length);
      const taskIndex = (w - 1) % fallbackTasks.length;
      weeks.push({
        weekNumber: w,
        theme: `${phases[phaseIndex]} — ${domainName}`,
        tasks: [
          {
            ...fallbackTasks[taskIndex],
            status: TaskStatus.PENDING,
          } as Task,
        ],
      } as Week);
    }
    return weeks;
  }
}
