import { TestBed } from '@angular/core/testing';

import { SupabaseWebsocketService } from './supabase-websocket.service';

describe('SupabaseWebsocketService', () => {
  let service: SupabaseWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
