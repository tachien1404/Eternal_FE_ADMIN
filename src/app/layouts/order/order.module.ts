import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderRouting} from "./order.routing";
import { TatcaComponent } from './tatca/tatca.component';
import { ChoxacnhanComponent } from './choxacnhan/choxacnhan.component';
import { DahuyComponent } from './dahuy/dahuy.component';
import { DanggiaoComponent } from './danggiao/danggiao.component';
import { DaGiaoComponent } from './da-giao/da-giao.component';

@NgModule({
  declarations:[
    TatcaComponent,
    ChoxacnhanComponent,
    DahuyComponent,
    DanggiaoComponent,
    DaGiaoComponent
  ],
  imports :[
    CommonModule,
    OrderRouting
  ]
})
export class OrderModule{}
