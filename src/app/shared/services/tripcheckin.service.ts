import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TripCheckIn } from '../models/tripcheckin.model';

@Injectable({
  providedIn: 'root'
})
export class TripCheckInService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  save(tripCheckIn: TripCheckIn): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/TripCheckIn`, tripCheckIn)
      .pipe(catchError(this.errorHandler));
  }

  getByTripId(tripId: number): Observable<TripCheckIn[]> {
    return this.http.get<TripCheckIn[]>(`${environment.server}/api/TripCheckIn/${tripId}`)
      .pipe(catchError(this.errorHandler));
  }
}
