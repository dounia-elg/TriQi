import { Injectable } from '@nestjs/common';
import { InstitutionDocument } from './institution.schema';

export interface RankedInstitution {
  institution: InstitutionDocument;
  score: number; 
}

@Injectable()
export class RecommendationService {

  rank(
    institutions: InstitutionDocument[],
    domainIds?: string[],
    country?: string,
    city?: string,
  ): InstitutionDocument[] {

    const ranked: RankedInstitution[] = institutions.map((inst) => {
      let score = 0;

      if (domainIds && domainIds.length > 0) {
        const instDomainIds = inst.domainIds.map((d) => d.toString());
        for (const domainId of domainIds) {
          if (instDomainIds.includes(domainId)) {
            score += 3;
          }
        }
      }

      if (country && inst.country.toLowerCase() === country.toLowerCase()) {
        score += 2;
      }
      if (city && inst.city.toLowerCase() === city.toLowerCase()) {
        score += 1;
      }

      return { institution: inst, score };
    });

    return ranked
      .sort((a, b) => b.score - a.score)
      .map((r) => r.institution);
  }
}
