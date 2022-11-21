import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.scss',
  ],
})
export class SidebarComponent implements OnInit {
  valuesSidebar: any = [
    {css: 'bx bx-user icon', value: 'Personas', link: "/personas"},
    {css: 'bx bx-bar-chart-alt-2 icon', value: 'Celulas', link: "/celulas"},
    {css: 'bx bx-bell icon', value: 'Tribus', link: "/tribus"},
    {css: 'bx bx-pie-chart-alt icon', value: 'Asignaciones', link: "/asignaciones"},
  ];

  @Input() closeSidebar: boolean = true
  @Input() isDarkMode: boolean = true

  @Output() toggleEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private renderer2: Renderer2
  ) {
  }

  ngOnInit(): void {

  }

  onClickToggleSwitch() {
    this.isDarkMode = !this.isDarkMode
  }

  onClickToggle() {
    this.closeSidebar = !this.closeSidebar
    this.toggleEventEmitter.emit(this.closeSidebar)

  }
@ViewChild('inputSearch') inputSearch: ElementRef
  onClickInputSearch(){
    this.closeSidebar = !this.closeSidebar
    this.toggleEventEmitter.emit(this.closeSidebar)
    this.inputSearch.nativeElement.focus()
  }

}
