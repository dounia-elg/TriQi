import { Injectable } from '@nestjs/common';
import { QuestionDocument } from '../questions/question.schema';
import { DomainDocument } from '../domains/domain.schema';

export interface RawAnswer {
  questionId: string;
  choiceIndex: number;
}

export interface ScoredDomain {
  domainId: string;
  domainName: string;
  score: number;
}

@Injectable()
export class ScoringService {

  calculateScores(
    answers: RawAnswer[],
    questions: QuestionDocument[],
    domains: DomainDocument[],
  ): ScoredDomain[] {

    const scoreMap: Record<string, number> = {};

    const domainNameMap: Record<string, string> = {};
    for (const domain of domains) {
      const id = (domain._id as { toString(): string }).toString();
      scoreMap[id] = 0;
      domainNameMap[id] = domain.name;
    }

    for (const answer of answers) {
      const question = questions.find(
        (q) => (q._id as { toString(): string }).toString() === answer.questionId,
      );

      if (!question) continue;

      const choice = question.choices[answer.choiceIndex];
      if (!choice) continue;

      for (const w of choice.weights) {
        const id = w.domainId.toString();
        if (scoreMap[id] !== undefined) {
          scoreMap[id] += w.weight;
        }
      }
    }

    const scored: ScoredDomain[] = Object.entries(scoreMap)
      .map(([domainId, score]) => ({
        domainId,
        domainName: domainNameMap[domainId],
        score,
      }))
      .sort((a, b) => b.score - a.score);

    return scored;
  }
}