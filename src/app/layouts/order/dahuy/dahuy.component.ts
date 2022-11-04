import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dahuy',
  templateUrl: './dahuy.component.html',
  styleUrls: ['./dahuy.component.css']
})
export class DahuyComponent implements OnInit {
  orderdata:any;
  constructor(private service:OrderService,private dialog: MatDialog) {
    this.loadAll3();
  }

  ngOnInit(): void {
  }

  loadAll3(){
    this.service.getBy3().subscribe(result =>{
      this.orderdata=result;
    })
  }
  Input = new FormGroup({

    status:new FormControl()
  })

  updatetrangthai(id:any,status:any) {

    if(status==0){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll3()

      });
    }else if(status==3){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll3()

      });
    }
  }
  OpenDialog(enteranimation: any, exitanimation: any,id:any,statusname:any) {

    this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "70%",
      data:{
        id:id,
        statusname:statusname
      },

    })
  }
}
