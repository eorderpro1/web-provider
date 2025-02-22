import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsSupabaseService {
  private supabaseService = inject(SupabaseService);
  fetchNewOrderStatistics(data: { supplier_id: number}) {
    return this.supabaseService.postRequest('rpc/get_new_orders_summary', data.supplier_id);
  }
}
