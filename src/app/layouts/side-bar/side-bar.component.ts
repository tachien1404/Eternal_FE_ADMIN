import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private ElByClassName: ElementRef) {}

  ngOnInit(): void {
  }

  status: boolean = false;
clickEvent(){
    this.status = !this.status;
}
 greet(){
    console.log('hello');
    const btnElement = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.dropdown-menu'
      );
      console.log(btnElement);

      // btnElement.innerHTML = 'This is Button';
 }
}
