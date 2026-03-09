import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}

  async generateInstitutionInsights(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const model =
      this.configService.get<string>('OPENROUTER_MODEL') ||
      'openai/gpt-4o-mini';

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is missing in .env');
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are an educational and career guidance assistant. Your role is to explain why an institution matches a student profile and provide short actionable advice.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content;
  }
}