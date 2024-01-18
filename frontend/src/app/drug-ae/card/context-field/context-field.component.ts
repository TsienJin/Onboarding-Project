import {Component, Input} from '@angular/core';
import {NzAutosizeDirective, NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {CallbackTypes} from "../../../util/types/callback.types";
import {FormControl, FormRecord, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'drug-ae-context-field',
  standalone: true,
  imports: [
    NzAutosizeDirective,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    ReactiveFormsModule
  ],
  templateUrl: './context-field.component.html',
  styleUrl: './context-field.component.css'
})
export class ContextFieldComponent {

  @Input() fg!: FormRecord<FormControl<string>>
  @Input() index!: number
  @Input() name!: string
  @Input() callback!: CallbackTypes<string>


  onDeleteClick(){
    this.callback(this.name)
    this.fg.removeControl(this.name)
  }

}
