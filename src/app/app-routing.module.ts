import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {BrandComponent} from "./layouts/brand/brand.component";
import {CategoryComponent} from "./layouts/category/category.component";

const routes:  Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
  {
    path:'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  }
  ,{
    path :'category',loadChildren:()=> import('./pages/category/add-cate/cate.module').then((m =>m.CateModule))
  },
  {
    path :'SCDetails',loadChildren:()=> import('./pages/s-c-details/s-c.module').then((m =>m.SCModule))
  },
  {
    path:'order',loadChildren:()=>import('./layouts/order/order.module').then((m=>m.OrderModule))
  }
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
