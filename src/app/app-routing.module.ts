import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(x => x.EntriesModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(x => x.CategoriesModule) },
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(x => x.ReportsModule) },
  { path: '', redirectTo: '/reports', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
