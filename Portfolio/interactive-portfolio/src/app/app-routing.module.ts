import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'projects', component: ProjectsComponent },
    { path: '**', redirectTo: '' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {}
