import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { InstitutionDocument } from './institution.schema';

@Injectable()
export class InstitutionsAIService {
  constructor(private aiService: AiService) {}

  async generateExplanation(
    institution: InstitutionDocument,
    userScores: any[],
  ): Promise<string> {
    const scoresContext = userScores
      .map((s) => `${s.domainName}: ${s.score}`)
      .join(', ');

    const prompt = `
      User orientation test results (domain scores): ${scoresContext}.
      Institution: ${institution.name} (${institution.type}).
      Programs offered: ${institution.programs.join(', ')}.
      Location: ${institution.city}, ${institution.country}.
      
      Explain in one or two simple, encouraging sentences why this institution is a great match for this user based on their top scores and the programs offered.
    `;

    const insights = await this.aiService.generateInstitutionInsights(prompt);
    return insights.explanation;
  }
}
