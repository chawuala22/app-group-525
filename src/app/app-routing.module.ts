import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInfoComponent } from './pages/forms/view-info/view-info.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () =>
      import('./pages/forms/forms.module').then((m) => m.FormsModule),
  },
  {
    path: 'view-info',
    component: ViewInfoComponent,
  },
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
