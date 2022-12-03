import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tao-don-hang',
  templateUrl: './tao-don-hang.component.html',
  styleUrls: ['./tao-don-hang.component.css']
})
export class TaoDonHangComponent implements OnInit {
customer : any;
name :any;
  constructor(
    private toastr: ToastrService, private router: Router, private don_hang: CustomerService, private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
  }
  openLg(content: any) {


    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,


    })
  }
}
