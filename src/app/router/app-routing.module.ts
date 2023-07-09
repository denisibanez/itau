import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard';

// Views
import { LayoutComponent } from '../views/layout/layout.component';
import { HomeComponent } from '../views/home/home.component';
import { NotfoundComponent } from '../views/notfound/notfound.component';
import { DetailsComponent } from '../views/details/details.component';

// remove comment for use guard and login in your app
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: '404',
        component: NotfoundComponent,
      },
      {
        path: '**',
        redirectTo: '/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
