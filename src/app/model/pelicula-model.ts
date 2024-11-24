export class PeliculaModel {
    // Identificador único de la película
    id: number = 0;
  
    // Nombre de la película
    nombre: string = '';
  
    // URL de la imagen o cubierta de la película
    cubierta: string = '';
  
    // Descripción de la película
    descripcion: string = '';
  
    // Puntaje de la película (de 0 a 10)
    puntaje: number = 0;
  
    // Estado de la película, puede ser 'Publicada' o 'edición'
    estado: 'Publicada' | 'edicion' = 'Publicada';
  
    // Estado del alquiler, puede ser 'Disponible' o 'Alquilada'
    estadoAlquiler: 'Disponible' | 'Alquilada' = 'Disponible';
  
    // Fecha de creación de la película, por defecto se establece en la fecha actual
    fechaCreacion: Date = new Date();
  
    // Fecha de la última modificación, por defecto se establece en la fecha actual
    fechaModificacion: Date = new Date();
  
    // Representación de la cubierta como cadena (puede ser útil para mostrar en algunos contextos)
    cubiertaAsString: string = '';
  }
  