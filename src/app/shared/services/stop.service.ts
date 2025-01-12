import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Stop } from '../models/stop.model';

@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  getAll(): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${environment.server}/api/Stops`)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Stop> {
    return this.http.get<Stop>(`${environment.server}/api/Stops/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  save(stop: Stop): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/Stops`, stop)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, stop: Stop): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/Stops/${id}`, stop)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/api/Stops/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  search(term: string): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${environment.server}/api/Stops/search?name=${term}`)
      .pipe(catchError(this.errorHandler));
  }

  nearby(latitude: number, longitude: number): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${environment.server}/api/Stops/nearby?latitude=${latitude}&longitude=${longitude}`)
      .pipe(catchError(this.errorHandler));
  }
}
