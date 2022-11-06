import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-da-giao',
  templateUrl: './da-giao.component.html',
  styleUrls: ['./da-giao.component.css']
})
export class DaGiaoComponent implements OnInit {
  orderdata:any;
  constructor(private service:OrderService,private dialog: MatDialog) { this.loadAll2(); }

  ngOnInit(): void {
  }
loadAll2(){
  this.service.getBy2().subscribe(result =>{
    this.orderdata=result;
  })
}
  Input = new FormGroup({

    status:new FormControl()
  })

  updatetrangthai(id:any,status:any) {

    if(status==2){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll2()

      });
    }else if(status==3){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll2()

      });
    }
  }
  OpenDialog(enteranimation: any, exitanimation: any,id:any,statusname:any) {

    this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "100%",
      data:{
        id:id,
        statusname:statusname
      },

    })
  }
}
