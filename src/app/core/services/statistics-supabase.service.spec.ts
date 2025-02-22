import { TestBed } from '@angular/core/testing';

import { StatisticsSupabaseService } from './statistics-supabase.service';

describe('StatisticsSupabaseService', () => {
  let service: StatisticsSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
