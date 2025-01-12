import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Holiday } from '../models/holiday.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  getAll(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${environment.server}/api/Holidays`)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${environment.server}/api/Holidays/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  save(holiday: Holiday): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/Holidays`, holiday)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, holiday: Holiday): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/Holidays/${id}`, holiday)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/api/Holidays/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
