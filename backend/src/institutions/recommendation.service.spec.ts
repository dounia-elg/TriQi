import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    service = new RecommendationService(); 
  });

  const instA = {
    _id: 'a',
    name: 'ENSIAS',
    country: 'Maroc',
    city: 'Rabat',
    domainIds: [{ toString: () => 'd1' }, { toString: () => 'd2' }],
  } as any;

  const instB = {
    _id: 'b',
    name: 'École HEC',
    country: 'France',
    city: 'Paris',
    domainIds: [{ toString: () => 'd2' }],
  } as any;

  it('should rank by matching domains', () => {
    const result = service.rank([instA, instB], ['d1', 'd2']);
    expect(result[0].name).toBe('ENSIAS'); // Score 6 vs Score 3
  });

  it('should boost by country and city', () => {
    const result = service.rank([instA, instB], ['d2'], 'Maroc', 'Rabat');
    // instA: d2(3) + Maroc(2) + Rabat(1) = 6
    // instB: d2(3) + France(0) = 3
    expect(result[0].name).toBe('ENSIAS');
  });

  it('should handle empty lists', () => {
    expect(service.rank([])).toEqual([]);
  });
});
