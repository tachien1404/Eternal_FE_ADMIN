import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AccountComponent } from './layouts/account/account.component';
import {AuthGuard} from "./auth/auth.guard";
import {AdminGuard} from "./auth/admin.guard";
import {OrderdetailComponent} from "./layouts/order/orderdetail/orderdetail.component";
import { SizeGiayComponent } from './layouts/size-giay/size-giay.component';
import { MauSacComponent } from './layouts/mau-sac/mau-sac.component';
import { DeGiayComponent } from './layouts/de-giay/de-giay.component';

const routes:  Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
    // canActivate:[AuthGuard]
  },
  {
    path:'configProduct/:id', loadChildren: () => import('./pages/config-product/configProduct.module').then(m => m.ConfigProductModule),
    // canActivate:[AuthGuard]
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
    // canActivate:[AdminGuard]
  },
  {
    path:'sizes',component: SizeGiayComponent,
    // canActivate:[AdminGuard]
  },  {
    path:'colors',component: MauSacComponent,
    // canActivate:[AdminGuard]
  },
  {
    path:'soles',component: DeGiayComponent,
    // canActivate:[AdminGuard]
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
  },
  {
    path:'', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'promotion', loadChildren: () => import('./pages/promotion/promotion.module').then(m => m.PromotionModule),
     canActivate:[AuthGuard]
  },
  {
    path:'configPromotion/:id', loadChildren: () => import('./pages/config-promotion/configPromotion.module').then(m => m.ConfigPromotionModule),
     canActivate:[AuthGuard]
  }

]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule {
}
