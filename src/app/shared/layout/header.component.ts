import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  isLightMode: boolean = true;
  ngOnInit(): void {}

  // changeTheme(event: MatSlideToggleChange) {
  //   if (event.checked) {
  //     this.renderer.addClass(document.body, 'dark-theme');
  //   } else {
  //     this.renderer.removeClass(document.body, 'dark-theme');
  //   }
  // }

  changeTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      this.renderer.removeClass(document.body, 'dark-theme');
    } else {
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }
}
