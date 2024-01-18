import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzButtonComponent, NzButtonGroupComponent} from "ng-zorro-antd/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzAutosizeDirective, NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzSpaceComponent} from "ng-zorro-antd/space";
import {NzColDirective} from "ng-zorro-antd/grid";
import {FormControl, FormRecord, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzRadioButtonDirective, NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NgForOf} from "@angular/common";
import {ContextFieldComponent} from "./context-field/context-field.component";
import {DrugAeContextTypes} from "../../util/types/drug-ae-context.types";
import {DrugAeCardFormTypes} from "../../util/types/drug-ae-card-form.types";

@Component({
  selector: 'drug-ae-card',
  standalone: true,
  imports: [NzCardComponent, NzButtonComponent, NzFormDirective, NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzInputDirective, NzSpaceComponent, NzColDirective, ReactiveFormsModule, NzFlexDirective, NzDividerComponent, NzAutosizeDirective, NzInputGroupComponent, NzButtonGroupComponent, NzRadioGroupComponent, NzRadioButtonDirective, NzRadioComponent, NgForOf, ContextFieldComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input() cardId!: number
  @Output('DeleteCard') deleteCardEmitter:EventEmitter<number> = new EventEmitter<number>()

  private latestContextId:number = 0

  contextForm: FormRecord<FormControl<string>> = this.fb.group({})
  contextArray:DrugAeContextTypes[] = []

  fixedInputNamesRequired: string[] = [
    "drugInAdr",
    "aeInAdr",
  ]

  fixedInputNamesOptional: string[] = [
    "adrPossibility",
    "remarks"
  ]



  constructor(
    private fb: NonNullableFormBuilder
  ) {}



  ngOnInit() {
    this.addContext()
    this.fixedInputNamesRequired.forEach(name => this.contextForm.addControl(name, this.fb.control('', Validators.required)))
    this.fixedInputNamesOptional.forEach(name => this.contextForm.addControl(name, this.fb.control('')))
  }

  addContext(){

    const nextIndex:number = this.latestContextId++
    this.contextArray.push({
      id: nextIndex,
      name: `context-${nextIndex}`
    })

    this.contextForm.addControl(
      `context-${nextIndex}`,
      this.fb.control('')
    )
  }


  deleteIndexAt(name:string) {
    const indexToRemove = this.contextArray.map(c=>c.name).indexOf(name)
    this.contextArray.splice(indexToRemove, 1)
    this.contextForm.removeControl(name)
  }

  deleteThisCard(){
    this.deleteCardEmitter.emit(this.cardId)
  }


  validate():boolean {
    return this.contextForm.status === "VALID"
  }

  fetchContents():DrugAeCardFormTypes {

    const contexts = Object.keys(this.contextForm.controls)
      .filter(key=>key.includes("context-"))
      .map(key=>this.contextForm.controls[key].value)
      .filter(val=>val!=='')

    const labeledFields = [...this.fixedInputNamesOptional, ...this.fixedInputNamesRequired]

    let labeledFieldsKv: {[key:string]:string} = {}
    labeledFields.map(key => {
      labeledFieldsKv[key] = this.contextForm.controls[key].value
    })

    return {
      drugInAdr: labeledFieldsKv['drugInAdr'],
      aeInAdr: labeledFieldsKv['aeInAdr'],
      adrPossibility: labeledFieldsKv['adrPossibility'],
      remarks: labeledFieldsKv['remarks'],
      context: contexts
    } as DrugAeCardFormTypes
  }

  // RESET must be called from parent before calling this method! This is to avoid
  set(contents:DrugAeCardFormTypes){

    this.contextForm.controls['drugInAdr'].setValue(contents.drugInAdr)
    this.contextForm.controls['aeInAdr'].setValue(contents.aeInAdr)
    this.contextForm.controls['adrPossibility'].setValue(contents.adrPossibility || "")
    this.contextForm.controls['remarks'].setValue(contents.remarks || "")

    // remove all contexts
    Object.keys(this.contextForm.controls)
      .filter(key=>key.includes("context-"))
      .map(key=>{
        this.deleteIndexAt(key)
      })

    this.contextArray = []

    contents.context.map((ctx, index)=>{
      this.addContext()
      this.contextForm.controls[`context-${this.latestContextId-1}`].setValue(ctx||"")
    })

  }

}
