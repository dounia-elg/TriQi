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
      Student interests: Computer Science, Technology

      Institution:
      Name: ENSA
      Country: Morocco
      Programs: Software Engineering, Artificial Intelligence
      `;

    const result = await this.aiService.generateInstitutionInsights(prompt);

    return result;
  }
}