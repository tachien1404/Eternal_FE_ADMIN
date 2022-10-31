import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {BrandComponent} from "./layouts/brand/brand.component";
import {CategoryComponent} from "./layouts/category/category.component";

const routes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }]},
  {
    path:'brand',  loadChildren: () => import('./layouts/brand/brand.module').then(x => x.BrandModule)
  }
  ,
  {
    path:'category',  loadChildren: () => import('./layouts/category/category.module').then(x => x.CategoryModule)
  },
  {
    path:'order',  loadChildren: () => import('./layouts/order/order.module').then(x => x.OrderModule)
  }

]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
