import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "../../../common/modal/dialog.component";
import {DialogService} from "../../../common/modal/dialog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface ModelDialog {
  titleModal: string,
  data: any,
}

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss']
})
export class ModalTestComponent extends DialogComponent<ModelDialog, any> implements OnInit {

  titleModal: string;
  data: any;

  selectItems: any[]
  fg = new FormGroup({
    select: new FormControl('',[Validators.required]),
  });


  constructor(dialogService:DialogService) {
    super(dialogService)
  }

  ngOnInit(): void {

    this.selectItems = [
      {value: 1, label: "BACK",},
      {value: 2, label: "FRONT",},
      {value: 3, label: "DEVOPS",}
    ]
  }

  confirm() {
    console.log('submit')
    this.close()
  }

}
