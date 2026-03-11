import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { InstitutionDocument } from './institution.schema';

@Injectable()
export class InstitutionsAIService {
  constructor(private aiService: AiService) {}

  async generateInsights(
    institution: InstitutionDocument,
    userScores: any[],
  ): Promise<{ explanation: string; advice: string[] }> {
    const scoresContext = userScores
      .map((s) => `${s.domainName}: ${s.score}`)
      .join(', ');

    const prompt = `
      User orientation test results (domain scores): ${scoresContext}.
      Institution: ${institution.name} (${institution.type}).
      Programs offered: ${institution.programs.join(', ')}.
      Location: ${institution.city}, ${institution.country}.
      
      1. Explain in one or two simple, encouraging sentences why this institution is a great match for this user based on their top scores and programs.
      2. Provide 1 to 3 very short, actionable, and practical tips to help the user prepare for this institution (e.g., "Strengthen your portfolio", "Apply before May", "Join a local club").
    `;

    return this.aiService.generateInstitutionInsights(prompt);
  }
}
