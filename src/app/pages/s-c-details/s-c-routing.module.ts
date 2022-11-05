import {RouterModule, Routes} from "@angular/router";
import {AddCateComponent} from "../category/add-cate/add-cate.component";
import {NgModule} from "@angular/core";
import {SCDetailsComponent} from "./s-c-details.component";

const routes: Routes = [{ path: '', component: SCDetailsComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class SCRoutingModule{}
