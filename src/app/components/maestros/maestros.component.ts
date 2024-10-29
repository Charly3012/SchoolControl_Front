import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;
declare const window: any;


@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {


  teachers: any[] = []; // Aquí almacenaremos los maestros
  private apiUrl = 'https://localhost:7069/teacher/'; // URL del backend
  public nuevoMaestro = { name: '', email: '' }; // Objeto para almacenar los datos del nuevo maestro


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeachers(); // Cargar los maestros al iniciar el componente
  }

  // Función para cargar los maestros
  loadTeachers(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.teachers = data.teachers; // Guardar los registros en la variable
      },
      error: (err) => {
        console.error('Error al cargar los maestros', err);
      }
    });
  }

  // Función para eliminar un maestro
  deleteTeacher(id: number): void {
    const deleteUrl = `${this.apiUrl}${id}`; // Construir la URL para la petición DELETE

    this.http.delete(deleteUrl).subscribe({
      next: () => {
        console.log(`Maestro con id ${id} eliminado.`);
        this.loadTeachers(); // Recargar la lista de maestros
      },
      error: (err) => {
        console.error('Error al eliminar el maestro', err);
      }
    });
  }




  abrirModalAgregar() {
    const modal = new window.bootstrap.Modal(document.getElementById('modalAgregarMaestro'));
    modal.show();
  }

  agregarMaestro() {
    const url = 'https://localhost:7069/teacher/';
    this.http.post(url, this.nuevoMaestro).subscribe({
      next: (response) => {
        console.log('Maestro agregado:', response);
        this.loadTeachers(); // Recargar la lista de maestros
        this.cerrarModal(); // Cerrar el modal
      },
      error: (error) => {
        console.error('Error al agregar el maestro:', error);
      }
    });
  }

  cerrarModal() {
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalAgregarMaestro'));
    modal.hide();
    this.nuevoMaestro = { name: '', email: '' }; // Limpiar el formulario
  }

}
