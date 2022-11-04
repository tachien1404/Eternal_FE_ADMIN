import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-danggiao',
  templateUrl: './danggiao.component.html',
  styleUrls: ['./danggiao.component.css']
})
export class DanggiaoComponent implements OnInit {
  orderdata:any;
  constructor( private service:OrderService,private dialog: MatDialog) {
    this.loadAll1();
  }

  ngOnInit(): void {
  }
loadAll1(){
    this.service.getBy1().subscribe(result =>{
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

        this.loadAll1()

      });
    }else if(status==3){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll1()

      });
    }
  }
  OpenDialog(enteranimation: any, exitanimation: any,id:any) {

    this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "70%",
      data:{
        id:id

      },

    })
  }
}
