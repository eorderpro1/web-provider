import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private apiUrl = 'https://ulufshgjfsfzwvdxdwth.supabase.co/rest/v1/';
  private http =inject(HttpClient);
  private readonly apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM';

  private readonly beareToken = "Bearer "+this.apiKey;

  public getRequest(url: string, params: HttpParams): Observable<HttpResponse<any[]>> {
    let headers = new HttpHeaders()
      .set("Prefer","count=exact")
      .set('Authorization', this.beareToken)
      .set('Content-Type', 'application/json')
      .set('apikey', this.apiKey);
 
    return this.http.get<any[]>(this.apiUrl + url, {observe:'response', headers, params });
  }
  public postRequest(url: string, body: any, params?: HttpParams): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders()
    .set("Prefer","count=exact")
    .set('Authorization', this.beareToken)
    .set('Content-Type', 'application/json')
    .set('apikey', this.apiKey);
  
    return this.http.post<any>(this.apiUrl + url, body, { observe: 'response', headers, params });
  }
}
