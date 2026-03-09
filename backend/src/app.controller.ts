import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai/ai.service';

@Controller()
export class AppController {
  constructor(private readonly aiService: AiService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'triqi-api' };
  }

  @Get('ai-test')
  async testAi() {
    const prompt = `
      User top domains: Computer Science, Technology

      Institution:
      Name: ENSA
      Country: Morocco
      Programs: Software Engineering, Artificial Intelligence

      Explain why this institution fits the student and give 2 short advice.
    `;

    const result = await this.aiService.generateInstitutionInsights(prompt);

    return { aiResponse: result };
  }
}
