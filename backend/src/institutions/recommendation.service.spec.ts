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

  const instC = {
    _id: 'c',
    name: 'ISCAE',
    country: 'Maroc',
    city: 'Casablanca',
    domainIds: [{ toString: () => 'd1' }],
  } as any;

  it('should rank by number of matching domains', () => {
    // instA matches d1+d2 (score 6), instB matches d2 (score 3)
    const result = service.rank([instA, instB], ['d1', 'd2']);
    expect(result[0].name).toBe('ENSIAS');
    expect(result[1].name).toBe('École HEC');
  });

  it('should boost institutions matching the preferred country', () => {
    // instA: domain d1 (3) + country Maroc (2) = 5
    // instC: domain d1 (3) + country Maroc (2) + city Casablanca (0) = 5 (tie)
    // instB: domain d2 (0) + country France (0) = 0 (no domain match since we don't pass d2)
    const result = service.rank([instB, instC, instA], ['d1'], 'Maroc');
    // Maroc institutions should be ranked above France
    expect(result[0].name === 'ENSIAS' || result[0].name === 'ISCAE').toBe(true);
    expect(result[result.length - 1].name).toBe('École HEC');
  });

  it('should boost institutions matching the preferred city', () => {
    // instA: d1(3) + Maroc(2) + Rabat(1) = 6
    // instC: d1(3) + Maroc(2) = 5
    const result = service.rank([instC, instA], ['d1'], 'Maroc', 'Rabat');
    expect(result[0].name).toBe('ENSIAS'); 
    expect(result[1].name).toBe('ISCAE');
  });

  it('should return all institutions sorted even with no filters', () => {
    const result = service.rank([instA, instB, instC]);
    expect(result).toHaveLength(3);
  });

  it('should return empty array if no institutions', () => {
    const result = service.rank([]);
    expect(result).toEqual([]);
  });
});
