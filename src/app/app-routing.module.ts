import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AccountComponent } from './layouts/account/account.component';
import {AuthGuard} from "./auth/auth.guard";
import {AdminGuard} from "./auth/admin.guard";

const routes:  Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
    canActivate:[AuthGuard]
  }
  ,{
    path :'category',loadChildren:()=> import('./pages/category/add-cate/cate.module').then((m =>m.CateModule)),
    canActivate:[AuthGuard]
  },
  {
    path :'SCDetails',loadChildren:()=> import('./pages/s-c-details/s-c.module').then((m =>m.SCModule)),
    canActivate:[AuthGuard]
  },
  {
    path:'order',loadChildren:()=>import('./layouts/order/order.module').then((m=>m.OrderModule)),
    canActivate:[AuthGuard]
  },
  {
    path:'brand',loadChildren:()=>import('./layouts/brand/brand.module').then((m=>m.BrandModule)),
    canActivate:[AuthGuard]
  },
  {
    path:'account',component: AccountComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'tao-don-hang',loadChildren:()=>import('./layouts/tao-don-hang/tao-don-hang.module').then((m=>m.TaoDonHangModule)),
    canActivate:[AuthGuard]
  },
  {
    path:'hoadoncho',loadChildren:()=>import('./layouts/hoa-don-cho/hoa-don-cho.module').then((m=>m.HoaDonChoModule)),
    canActivate:[AuthGuard]
  },

  {
    path:'thongke',loadChildren:()=>import('./layouts/thongke/thongke.module').then((m=>m.ThongkeModule)),
    canActivate:[AdminGuard]
  },
  {
    path:'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  }


]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
