import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'counter', loadChildren: () => 
            import('./components/counter/counter.module').then( m => m.CounterModule)
  },
  { path: 'courses', loadChildren: () => 
            import('./components/courses/courses.module').then(m => m.CoursesModule)
  },
  { path: 'auth', loadChildren: () => 
            import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
