import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private apiUrl = 'https://ulufshgjfsfzwvdxdwth.supabase.co/rest/v1/';
  private http =inject(HttpClient);
  public getRequest(url: string, params: HttpParams): Observable<HttpResponse<any[]>> {
    let headers = new HttpHeaders()
      .set("Prefer","count=exact")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM')
      .set('Content-Type', 'application/json')
      .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM');
 
    return this.http.get<any[]>(this.apiUrl + url, {observe:'response', headers, params });
  }
}
