import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from "../../common/modal/dialog.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BaseComponent implements OnInit {

  isClosed: boolean = true
  isDark: boolean = true
  isIframe = false;

  constructor(private router: Router,
              private elementRef: ElementRef,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.dialogService.setContainer(this.elementRef.nativeElement.shadowRoot)
  }

  verifyIfWelcome() {
    if (this.router.url.includes('welcome')) {
      return true;
    }
    return false;
  }

  onClickToggle(isClosed: boolean) {
    this.isClosed = isClosed
  }

}
