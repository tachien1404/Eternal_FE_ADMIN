import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./order.component";
import {TatcaComponent} from "./tatca/tatca.component";
import {ChoxacnhanComponent} from "./choxacnhan/choxacnhan.component";
import {DahuyComponent} from "./dahuy/dahuy.component";
const routes:Routes=[{path:'',component:OrderComponent,children:[
    {
path:'tatca',component:TatcaComponent
    },
    {path:'choxacnhan',component:ChoxacnhanComponent},
    {path:'dahuy',component:DahuyComponent}

  ]

}];

@NgModule({
imports :[RouterModule.forChild(routes)],


  exports :[RouterModule]
})
export class OrderRouting{}
