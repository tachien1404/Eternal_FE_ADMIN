import {Component, Inject, OnInit} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  constructor(private service: OrderService, public dialogref: MatDialogRef<ModalPopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
Orderdata:any;
  ngOnInit(): void {
this.loadAllbyOrrdeid(this.data.id);
  }
loadAllbyOrrdeid(id:any) {
this.service.getOrderId(id).subscribe(result =>{
  this.Orderdata=result;
  console.log(result)
})
  }
}
