import { Component } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  items = [
    { title: 'App One', desc: 'A slick Angular PWA', url:'#' },
    { title: 'App Two', desc: 'Node+Express API', url:'#' }
  ];
}
