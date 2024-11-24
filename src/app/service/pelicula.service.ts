import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PeliculaModel } from '../model/pelicula-model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private apiUrl = 'http://localhost:9000/api/v1/pelicula'; // Base URL de la API

  constructor(private httpClient: HttpClient) {}

  // Obtener la lista de películas
  getPeliculas(): Observable<PeliculaModel[]> {
    return this.httpClient
      .get<PeliculaModel[]>(`${this.apiUrl}/list`)
      .pipe(
        map((data) => data), // Este paso puede ser opcional si no transformas los datos
        catchError((error) => {
          console.error('Error al obtener las películas:', error);
          return of([]); // Retorna un array vacío en caso de error
        })
      );
  }

  // Guardar una nueva película
  savePeliculas(request: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.apiUrl}/save`, request)
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.error('Error al guardar la película:', error);
          return of(null); // Retorna null si ocurre un error
        })
      );
  }

  // Actualizar una película existente
  updatePeliculas(request: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.apiUrl}/update`, request)
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.error('Error al actualizar la película:', error);
          return of(null); // Retorna null si ocurre un error
        })
      );
  }

  // Eliminar una película
  deletePeliculas(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.error('Error al eliminar la película:', error);
          return of(null); // Retorna null si ocurre un error
        })
      );
  }

// Método para actualizar el estado de alquiler de una película
updateEstadoAlquiler(id: number, estadoAlquiler: string): Observable<any> {
  const body = estadoAlquiler;  // Creamos el cuerpo de la solicitud con el nuevo estado
  return this.httpClient
    .put<any>(`${this.apiUrl}/updateEstadoAlquiler/${id}`, body)  // Utiliza PUT para actualizar el estado
    .pipe(
      map((data) => data),
      catchError((error) => {
        console.error('Error al actualizar el estado de alquiler', error);
        return of(null);
      })
    );
}

  /**
   * Método para alquilar una película 
   * 
   * alquilarPeliculas(request: any): Observable<any> {
   *   return this.httpClient
   *     .post<any>('http://localhost:3000/api/peliculas/alquilar', request)
   *     .pipe(map((data) => data));
   * }
   */
}
