import { Component, OnInit,ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PeliculaModel } from 'src/app/model/pelicula-model';
import { PeliculaService } from 'src/app/service/pelicula.service';

declare var bootstrap: any; // para acceder al modal de Bootstrap

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.sass'],
})
export class PeliculaComponent implements OnInit {
  listPeliculas: PeliculaModel[] = [];
  formPelicula: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  selectedItem: PeliculaModel | null = null;

  // Referencia al modal
  @ViewChild('modal') modal: any;

  constructor(
    private fb: FormBuilder, // Injecta FormBuilder para crear el formulario
    private peliculaService: PeliculaService // Servicio para interactuar con la API
  ) {}

  ngOnInit(): void {
    this.list();
    this.initForm();
  }

  // Inicializa el formulario con los controles y validaciones
  initForm(): void {
    this.formPelicula = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: [''],
      puntaje: [0, [Validators.min(0), Validators.max(10)]],
      estado: ['publicada'],
      estadoAlquiler: ['disponible'],
      cubierta: ['', Validators.required], // Ahora es un campo de texto para la URL
    });
  }

  // Obtiene todas las películas desde el servicio
  list() {
    try {
      this.peliculaService.getPeliculas().subscribe((data) => {
        if (data) {
          this.listPeliculas = data; // Asigna las películas a la lista
        }
      });
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  }

  // Procesa el formulario cuando se envía
  onSubmit(): void {
    if (this.formPelicula.valid) {
      console.log('Formulario válido:', this.formPelicula.value);

      // Llama al servicio para guardar o actualizar los datos
      try {
        if (this.isUpdate) {
          this.update();
        } else {
          this.save();
        }
      } catch (error) {
        console.error('Error al procesar el formulario:', error);
      }
    } else {
      console.log('Formulario inválido.');
    }
  }

  // Guarda una nueva película en la base de datos
  save(): void {
    try {
      console.log('Datos enviados:', this.formPelicula.value);

      // Si no existe la fecha de creación, asigna la fecha actual
      if (!this.formPelicula.value.fechaCreacion) {
        this.formPelicula.value.fechaCreacion = new Date().toISOString(); // Genera la fecha actual en formato ISO
      }

      // Llama al servicio para guardar la película
      this.peliculaService.savePeliculas(this.formPelicula.value).subscribe({
        next: (response) => {
          console.log('Película guardada:', response);
          alert('Película guardada exitosamente.');
          this.list();
          this.formPelicula.reset();
          this.closeModal(); // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al guardar la película:', err);
        },
      });
    } catch (error) {
      console.error('Error en la función save:', error);
    }
  }

  // Actualiza una película existente
  update(): void {
    try {
      this.peliculaService.updatePeliculas(this.formPelicula.value).subscribe({
        next: (response) => {
          console.log('Película actualizada:', response);
          alert('Película actualizada exitosamente.');
          this.list();
          this.formPelicula.reset();
          this.isUpdate = false;
          this.closeModal(); // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al actualizar la película:', err);
        },
      });
    } catch (error) {
      console.error('Error en la función update:', error);
    }
  }

  // Elimina una película por ID
  delete(id: any): void {
    try {
      this.peliculaService.deletePeliculas(id).subscribe({
        next: (response) => {
          console.log('Película eliminada:', response);
          alert('Película eliminada exitosamente.');
          this.list();
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
        },
      });
    } catch (error) {
      console.error('Error en la función delete:', error);
    }
  }

  // Reinicia el formulario para crear una nueva película
  newPelicula(): void {
    this.isUpdate = false;
    this.formPelicula.reset();
  }

  closeModal(): void {
    const modalElement = document.getElementById('nuevaPeliculaModal');
    const modal = new bootstrap.Modal(modalElement!); // Inicializa el modal de Bootstrap
    modal.hide(); // Cierra el modal
  }
  // Método para seleccionar una película para actualización
  selectItem(item: PeliculaModel): void {
    try {
      this.isUpdate = true;
      this.selectedItem = item; // Guardar el item seleccionado
      this.formPelicula.patchValue({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        puntaje: item.puntaje,
        estado: item.estado,
        estadoAlquiler: item.estadoAlquiler,
        cubierta: item.cubierta, // Ahora será una URL
      });
    } catch (error) {
      console.error('Error al seleccionar la película:', error);
    }
  }
}
