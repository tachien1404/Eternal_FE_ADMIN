import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrandComponent} from "./layouts/brand/brand.component";
import {CategoryComponent} from "./layouts/category/category.component";
import { UserrRegisterComponent } from './layouts/userr-register/userr-register.component';
import { AccountComponent } from './layouts/account/account.component';

const routes:  Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
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
  },
  {
    path:'brand',loadChildren:()=>import('./layouts/brand/brand.module').then((m=>m.BrandModule))
  },
  {
    path:'account',component: AccountComponent
  }


]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
