import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document: Document, private ElByClassName: ElementRef, private router: Router) { }

  ngOnInit(): void {
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  greet() {
    console.log('hello');
    const btnElement = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.dropdown-menu'
    );
    console.log(btnElement);

    // btnElement.innerHTML = 'This is Button';
  }

  selected(id: string) {
    let uri = "" + this.router.url
    console.log(uri);
    if (uri.indexOf(id) !== -1) {
      document.getElementById(id)?.classList.add('selected');
    }
  }
}
