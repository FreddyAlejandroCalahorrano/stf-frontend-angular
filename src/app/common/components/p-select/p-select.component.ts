import {Component, forwardRef, HostBinding, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-p-select',

  templateUrl: './p-select.component.html',
  styleUrls: ['./p-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PSelectComponent),
      multi: true,
    },
  ]
})
export class PSelectComponent implements ControlValueAccessor, OnInit {

  @HostBinding('value') hostValue: any;

  @Input() open: boolean = false
  @Input() size: string = STATESIZE.SMALL
  @Input() state: string = STATEPROP.NORMAL
  @Input() items: any[]
  @Input() itemSelected: any
  @Input() placeholder: string = 'Seleccione una opción ...'

  @Input() valueExpr: string = 'value'
  @Input() displayExpr: string = 'label'

  constructor() {
  }

  ngOnInit(): void {
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };


  writeValue(value: any) {
    // console.log(value)
    this.itemSelected = this.findItemSelect(value)
    this.hostValue = value == null ? '' : value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  get isOpen() {
    return this.open
  }

  handleClick(item: any) {
    // console.log(item)
    this.itemSelected = item
    this.onChange(item[this.valueExpr]);
    setTimeout(() => this.open = false, 300)
  }

  focusout(event: any) {
    if (this.open)
      this.open = false
  }

  findItemSelect = (value: string | number) => {
    if (!this.items)
      return null
    return this.items.find(item => item[this.valueExpr] == value)
  }

}

// interface OptionItem {
//   value: any
//   label: string
//   selected?: boolean
// }

export enum STATESIZE {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum STATEPROP {
  NORMAL = 'normal',
  DISABLED = 'disabled',
  FOCUS = 'focus',
  ERROR = 'error'
}
