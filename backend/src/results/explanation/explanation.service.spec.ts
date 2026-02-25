import { ExplanationService } from './explanation.service';

describe('ExplanationService', () => {
  let service: ExplanationService;

  beforeEach(() => {
    service = new ExplanationService();
  });

  const mockScores = [
    { domainId: 'd1', domainName: 'Informatique', score: 20 },
    { domainId: 'd2', domainName: 'Commerce', score: 14 },
    { domainId: 'd3', domainName: 'Art', score: 8 },
    { domainId: 'd4', domainName: 'Droit', score: 3 },
  ];

  it('should return explanations for top 3 domains only', () => {
    const result = service.generateExplanations(mockScores, 3);
    expect(result).toHaveLength(3);
    expect(result[0].domainName).toBe('Informatique');
    expect(result[1].domainName).toBe('Commerce');
    expect(result[2].domainName).toBe('Art');
  });

  it('should assign HIGH intensity to the top domain', () => {
    const result = service.generateExplanations(mockScores);
    expect(result[0].intensity).toBe('high');
  });

  it('should assign HIGH intensity when score >= 70% of top', () => {
    const result = service.generateExplanations(mockScores);
    expect(result[1].intensity).toBe('high');
  });

  it('should assign MEDIUM intensity when score is 40-69% of top', () => {
    const result = service.generateExplanations(mockScores);
    expect(result[2].intensity).toBe('medium');
  });

  it('should assign LOW intensity when score < 40% of top', () => {
    const scores = [
      { domainId: 'd1', domainName: 'Informatique', score: 20 },
      { domainId: 'd2', domainName: 'Droit', score: 3 },
    ];
    const result = service.generateExplanations(scores, 2);
    expect(result[1].intensity).toBe('low');
  });

  it('should return empty array if no domain scores', () => {
    const result = service.generateExplanations([]);
    expect(result).toEqual([]);
  });

  it('should include domain name in the explanation text', () => {
    const result = service.generateExplanations(mockScores);
    expect(result[0].text).toContain('Informatique');
  });
});