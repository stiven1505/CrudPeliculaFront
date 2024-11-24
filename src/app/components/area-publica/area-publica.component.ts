import { Component, OnInit } from '@angular/core';
import { PeliculaModel } from 'src/app/model/pelicula-model';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { Subscription } from 'rxjs';  // Importar para manejar la suscripción

@Component({
  selector: 'app-publica',
  templateUrl: './area-publica.component.html',
  styleUrls: ['./area-publica.component.sass'],
})
export class PublicaComponent implements OnInit {
  listPeliculas: PeliculaModel[] = [];
  searchTerm: string = '';
  sortOption: string = 'puntaje';  // Puede ser 'puntaje' o 'fecha'

  private peliculaSubscription: Subscription | null = null; // Inicializar como null
 // Añadido para gestionar la suscripción

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.listPublicadas();
  }

  // Obtener las películas publicadas
  listPublicadas(): void {
    // Usamos la suscripción para obtener datos y manejar errores
    this.peliculaSubscription = this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        // Verificar si los datos existen y filtrar las películas publicadas
        if (data) {
          this.listPeliculas = data.filter(
            (pelicula: PeliculaModel) => pelicula.estado === 'Publicada'
          );
        }
      },
      error: (err) => {
        // Manejar errores (se puede mostrar un mensaje al usuario)
        console.error('Error al obtener las películas:', err);
      },
    });
  }

  // Búsqueda por nombre
  filterPeliculas() {
    return this.listPeliculas.filter((pelicula) =>
      pelicula.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Ordenar películas por puntaje o fecha
  sortPeliculas() {
    // Filtra primero las películas, luego ordena según la opción seleccionada
    if (this.sortOption === 'puntaje') {
      return this.filterPeliculas().sort((a, b) => b.puntaje - a.puntaje);
    } else if (this.sortOption === 'fecha') {
      return this.filterPeliculas().sort(
        (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      );
    } else {
      // Si no se cumple ninguna de las condiciones, devuelve las películas sin ordenar
      return this.filterPeliculas();
    }
  }

  ngOnDestroy(): void {
    // Importante: Cancelar la suscripción para evitar fugas de memoria
    if (this.peliculaSubscription) {
      this.peliculaSubscription.unsubscribe();
    }
  }
}
