import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./order.component";

import {OrderdetailComponent} from "./orderdetail/orderdetail.component";



const routes: Routes = [{
  path: '', component: OrderComponent, children: [

  ]

}
, {path: 'orderdetail/:id', component: OrderdetailComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],


  exports: [RouterModule]
})
export class OrderRouting {
}
