import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;
declare const window: any;

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  subjects: any[] = []; // Aquí almacenaremos las materias
  teachers: any[] = []; // Lista de maestros para el select
  private subjectApiUrl = 'https://localhost:7069/subject/'; // URL del backend para materias
  private teacherApiUrl = 'https://localhost:7069/teacher/'; // URL del backend para maestros
  public nuevaMateria = { name: '', code: '', credits: 0, teacherId: null }; // Objeto para almacenar los datos de la nueva materia
  public nuevaReasignacion = { id: 0, newTeacherId: 0 }; // Objeto para almacenar los datos de la reasignación

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSubjects(); // Cargar las materias al iniciar el componente
    this.loadTeachers(); // Cargar los maestros al iniciar el componente
  }

  // Función para cargar las materias
  loadSubjects(): void {
    this.http.get<any>(this.subjectApiUrl).subscribe({
      next: (data) => {
        this.subjects = data.subjects; // Guardar los registros en la variable
      },
      error: (err) => {
        console.error('Error al cargar las materias', err);
      }
    });
  }

  // Función para cargar los maestros
  loadTeachers(): void {
    this.http.get<any>(this.teacherApiUrl).subscribe({
      next: (data) => {
        this.teachers = data.teachers; // Guardar los registros en la variable
      },
      error: (err) => {
        console.error('Error al cargar los maestros', err);
      }
    });
  }

  // Función para eliminar una materia
  deleteSubject(id: number): void {
    const deleteUrl = `${this.subjectApiUrl}${id}`; // Construir la URL para la petición DELETE

    this.http.delete(deleteUrl).subscribe({
      next: () => {
        console.log(`Materia con id ${id} eliminada.`);
        this.loadSubjects(); // Recargar la lista de materias
      },
      error: (err) => {
        console.error('Error al eliminar la materia', err);
      }
    });
  }

  abrirModalAgregar() {
    const modal = new window.bootstrap.Modal(document.getElementById('modalAgregarMateria'));
    modal.show();
  }

  agregarMateria() {
    const url = this.subjectApiUrl;
    this.http.post(url, this.nuevaMateria).subscribe({
      next: (response) => {
        console.log('Materia agregada:', response);
        this.loadSubjects(); // Recargar la lista de materias
        this.cerrarModal(); // Cerrar el modal
      },
      error: (error) => {
        console.error('Error al agregar la materia:', error);
      }
    });
  }

  cerrarModal() {
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalAgregarMateria'));
    modal.hide();
    this.nuevaMateria = { name: '', code: '', credits: 0, teacherId: null }; // Limpiar el formulario
  }

  // Abrir modal para reasignar materia
  abrirModalReasignar(materia: any) {
    this.nuevaReasignacion.id = materia.id; // Guardar el id de la materia a reasignar
    const modal = new window.bootstrap.Modal(document.getElementById('modalReasignarMateria'));
    modal.show();
  }

  // Reasignar materia
  reasignarMateria() {
    const url = `${this.subjectApiUrl}reassign`;
    this.http.post(url, this.nuevaReasignacion).subscribe({
      next: (response) => {
        console.log('Materia reasignada:', response);
        this.loadSubjects(); // Recargar la lista de materias
        this.cerrarModalReasignar(); // Cerrar el modal
      },
      error: (error) => {
        console.error('Error al reasignar la materia:', error);
      }
    });
  }

  cerrarModalReasignar() {
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalReasignarMateria'));
    modal.hide();
    this.nuevaReasignacion = { id: 0, newTeacherId: 0 }; // Limpiar el formulario
  }
}
