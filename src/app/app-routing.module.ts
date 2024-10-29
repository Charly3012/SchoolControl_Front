import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { MateriasComponent } from './components/materias/materias.component';

const routes: Routes = [
  { path: 'maestros', component: MaestrosComponent },
  { path: 'materias', component: MateriasComponent },
  { path: '', redirectTo: '/maestros', pathMatch: 'full' } // Redirigir a maestros por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
