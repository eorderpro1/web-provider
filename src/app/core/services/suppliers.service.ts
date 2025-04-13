import { HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }

    private supabaseService = inject(SupabaseService);
    getSupplierDataById(supplierId: string): Observable<Supplier[]> {
      return this.supabaseService.getRequest('suppliers', new HttpParams().set('id', 'eq.' + supplierId)).pipe(
        map((response: HttpResponse<Supplier[]>) => response.body || [])
      );
    }
}
