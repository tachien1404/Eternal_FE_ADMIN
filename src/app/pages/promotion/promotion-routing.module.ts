import {RouterModule, Routes} from "@angular/router";
import {PromotionComponent} from "./promotion.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: PromotionComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PromotionRoutingModule{}
