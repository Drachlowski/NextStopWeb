import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.server}/api/Trips`)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${environment.server}/api/Trips/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  save(trip: Trip): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/Trips`, trip)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, trip: Trip): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/Trips/${id}`, trip)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/api/Trips/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
