import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "../category/category.component";
import {NgModule} from "@angular/core";
import {TaoDonHangComponent} from "./tao-don-hang.component";

const  routes:Routes=[{path:'',component:TaoDonHangComponent}];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TaoDonHangRouting{}
