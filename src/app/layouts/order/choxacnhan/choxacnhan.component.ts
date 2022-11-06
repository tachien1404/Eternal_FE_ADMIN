import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";

@Component({
  selector: 'app-choxacnhan',
  templateUrl: './choxacnhan.component.html',
  styleUrls: ['./choxacnhan.component.css']
})
export class ChoxacnhanComponent implements OnInit {
  orderdata: any;

  constructor(private service: OrderService,private dialog: MatDialog) {
    this.loadAll0();
  }

  ngOnInit(): void {
  }

  loadAll0() {
    this.service.getBy0().subscribe(result => {
      this.orderdata = result;
    })
  }

  Input = new FormGroup({

status:new FormControl()
  })

  updatetrangthai(id:any,status:any) {

if(status==1){
  this.Input.value.status=status
  this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

    this.loadAll0()

  });
}else if(status==3){
  this.Input.value.status=status
  this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

    this.loadAll0()

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
