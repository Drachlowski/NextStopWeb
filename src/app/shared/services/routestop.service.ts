import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RouteStop } from '../models/routestop.model';

@Injectable({
  providedIn: 'root'
})
export class RouteStopService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  getAll(): Observable<RouteStop[]> {
    return this.http.get<RouteStop[]>(`${environment.server}/api/RouteStops`)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<RouteStop> {
    return this.http.get<RouteStop>(`${environment.server}/api/RouteStops/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  save(routeStop: RouteStop): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/RouteStops`, routeStop)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, routeStop: RouteStop): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/RouteStops/${id}`, routeStop)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/api/RouteStops/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
