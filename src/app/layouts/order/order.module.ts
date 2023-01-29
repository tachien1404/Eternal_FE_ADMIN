import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderRouting} from "./order.routing";

import {Material_module} from "../../../material_module";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {OrderdetailComponent} from "./orderdetail/orderdetail.component";


@NgModule({
  declarations:[

OrderdetailComponent,

  ],
    imports: [

        CommonModule,
        OrderRouting,

        Material_module,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class OrderModule{}
