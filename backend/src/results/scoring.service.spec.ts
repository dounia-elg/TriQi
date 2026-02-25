import { ScoringService } from './scoring.service';

describe('ScoringService', () => {
  let service: ScoringService;

  beforeEach(() => {
    service = new ScoringService();
  });

  it('should calculate and rank domain scores correctly', () => {
    const domains = [
      { _id: { toString: () => 'd1' }, name: 'Informatique' },
      { _id: { toString: () => 'd2' }, name: 'Commerce' },
    ] as any;

    const questions = [
      {
        _id: { toString: () => 'q1' },
        choices: [
          {
            text: 'Résoudre des problèmes',
            weights: [
              { domainId: { toString: () => 'd1' }, weight: 4 },
              { domainId: { toString: () => 'd2' }, weight: 1 },
            ],
          },
        ],
      },
      {
        _id: { toString: () => 'q2' },
        choices: [
          { text: 'Autre', weights: [] },
          {
            text: 'Gérer une boutique',
            weights: [
              { domainId: { toString: () => 'd2' }, weight: 5 },
            ],
          },
        ],
      },
    ] as any;

    const answers = [
      { questionId: 'q1', choiceIndex: 0 },
      { questionId: 'q2', choiceIndex: 1 },
    ];

    const result = service.calculateScores(answers, questions, domains);

    expect(result[0].domainName).toBe('Commerce');
    expect(result[0].score).toBe(6);
    expect(result[1].domainName).toBe('Informatique');
    expect(result[1].score).toBe(4);
  });

  it('should return score 0 if no choices match', () => {
    const domains = [
      { _id: { toString: () => 'd1' }, name: 'Informatique' },
    ] as any;

    const questions = [
      {
        _id: { toString: () => 'q1' },
        choices: [{ text: 'Choix', weights: [] }],
      },
    ] as any;

    const answers = [{ questionId: 'q1', choiceIndex: 0 }];
    const result = service.calculateScores(answers, questions, domains);

    expect(result[0].score).toBe(0);
  });
});