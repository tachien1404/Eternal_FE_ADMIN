import {RouterModule, Routes} from "@angular/router";
import {BrandComponent} from "../../brand/brand.component";
import {NgModule} from "@angular/core";
import {OrderdetailComponent} from "./orderdetail.component";

const routes:Routes=[{path:'',component:OrderdetailComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class OrderdetailRouting{}
