import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConvercaoDiretaComponent } from './conversao-direta/conversao-direta.component';
import { ConvercaoGeralComponent } from './conversao-geral/conversao-geral.component';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'direta', component: ConvercaoDiretaComponent},
  { path: 'geral', component: ConvercaoGeralComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para /home se a rota for vazia
  { path: '**', redirectTo: '/home' } // Redireciona para /home se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
