import { Injectable } from '@nestjs/common';
import { ScoredDomain } from '../scoring/scoring.service';

export type Intensity = 'high' | 'medium' | 'low';

export interface DomainExplanationResult {
  domainName: string;
  intensity: Intensity;
  text: string;
}

@Injectable()
export class ExplanationService {

  private getIntensity(score: number, topScore: number): Intensity {
    if (topScore === 0) return 'low';
    const ratio = score / topScore;
    if (ratio >= 0.7) return 'high';
    if (ratio >= 0.4) return 'medium';
    return 'low';
  }

  private getTemplate(domainName: string, intensity: Intensity): string {
    const templates: Record<Intensity, string> = {
      high: `Tu as un profil fortement orienté vers le domaine "${domainName}". Tes réponses montrent une affinité naturelle et profonde avec ce domaine. C'est très probablement là que tu excelleras et t'épanouiras le mieux.`,

      medium: `Le domaine "${domainName}" correspond bien à ton profil. Tu possèdes des aptitudes réelles dans ce domaine et avec de la pratique, tu pourrais y développer une belle expertise.`,

      low: `Le domaine "${domainName}" présente quelques points de contact avec ton profil, mais ce n'est pas ton orientation principale. Il peut néanmoins compléter tes compétences dans d'autres domaines.`,
    };

    return templates[intensity];
  }

  generateExplanations(
    domainScores: ScoredDomain[],
    topN: number = 3,
  ): DomainExplanationResult[] {
    if (domainScores.length === 0) return [];

    const topScore = domainScores[0].score;
    const topDomains = domainScores.slice(0, topN);

    return topDomains.map((d) => {
      const intensity = this.getIntensity(d.score, topScore);
      return {
        domainName: d.domainName,
        intensity,
        text: this.getTemplate(d.domainName, intensity),
      };
    });
  }
}