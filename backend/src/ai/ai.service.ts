import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}

  async generateInstitutionInsights(prompt: string): Promise<{
    explanation: string;
    advice: string[];
  }> {
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
              'You are an educational and career guidance assistant. Return only valid JSON with this format: {"explanation":"string","advice":["tip1","tip2"]}',
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

    const content = response.data.choices[0].message.content;

    try {
      return JSON.parse(content);
    } catch {
      return {
        explanation:
          'This institution is suitable because it offers programs related to your interests.',
        advice: [
          'Strengthen your skills in this field.',
          'Explore projects or internships related to this domain.',
        ],
      };
    }
  }
}