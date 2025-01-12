import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.error(error);
    return of(null);
  }

  getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.server}/api/Routes`)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Route> {
    return this.http.get<Route>(`${environment.server}/api/Routes/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  save(route: Route): Observable<any> {
    return this.http.post<any>(`${environment.server}/api/Routes`, route)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, route: Route): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/Routes/${id}`, route)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/api/Routes/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
