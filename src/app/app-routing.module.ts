import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent, LayoutDefaultComponent } from './shared';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./server/server.module').then((m) => m.ServerModule),
//   },
//   {
//     path: 'server',
//     redirectTo: '',
//   },
//   {
//     path: 'admin',
//     loadChildren: () =>
//       import('./admin/admin.module').then((m) => m.AdminModule),
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'server',
        pathMatch: 'full',
      },
      {
        path: 'server',
        loadChildren: () =>
          import('./server/server.module').then((m) => m.ServerModule),
      },
      {
        path: 'unauthorized',
        loadChildren: () =>
          import('./unauthorized/unauthorized.module').then(
            (m) => m.UnauthorizedModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LayoutDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
