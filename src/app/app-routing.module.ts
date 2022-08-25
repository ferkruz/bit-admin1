import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToCollectComponent } from './to-collect/to-collect.component';


const routes: Routes = [  
  {
    path: 'tocollect',
    component: ToCollectComponent,
    loadChildren: () => import('./to-collect/to-collect.module').then(m => m.ToCollectModule)
  },
  {
    path: 'topay',
    component: ToCollectComponent,
    loadChildren: () => import('./to-collect/to-collect.module').then(m => m.ToCollectModule)
  },
  {
    path: 'advance',
    component: ToCollectComponent,
    loadChildren: () => import('./to-collect/to-collect.module').then(m => m.ToCollectModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
