import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
  },
  {
    path:'tao-don-hang',loadChildren:()=>import('./layouts/tao-don-hang/tao-don-hang.module').then((m=>m.TaoDonHangModule))
  },
  {
    path:'hoadoncho',loadChildren:()=>import('./layouts/hoa-don-cho/hoa-don-cho.module').then((m=>m.HoaDonChoModule))
  },
  {
    path:'khuyenmai',loadChildren:()=>import('./layouts/khuyenmai/khuyenmai.module').then((m=>m.KhuyenmaiModule))
  }


]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
