import {ChangeDetectorRef, Component, QueryList, ViewChildren} from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {CardComponent} from "./card/card.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgForOf} from "@angular/common";
import axios from "axios";
import {DrugAeCardFormTypes} from "../util/types/drug-ae-card-form.types";
import {environment} from "../../environment/environment";

@Component({
  selector: 'app-drug-ae',
  standalone: true,
  imports: [
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzDividerComponent,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzButtonComponent,
    NzSpaceItemDirective,
    CardComponent,
    NzIconDirective,
    NgForOf
  ],
  templateUrl: './drug-ae.component.html',
  styleUrl: './drug-ae.component.css'
})
export class DrugAeComponent {

  @ViewChildren(CardComponent) cards: QueryList<CardComponent> | undefined

  cardIdUniqueIndex = 0
  cardIdArray:number[] = [this.cardIdUniqueIndex]


  constructor(private cdr: ChangeDetectorRef) {
  }

  addCard() {
    this.cardIdArray.push(++this.cardIdUniqueIndex)
  }

  deleteCard(id:number){
    this.cardIdArray.splice(this.cardIdArray.indexOf(id), 1)
  }


  submit(){

    const cardsWithInvalidInputs = this.cards?.map(card=>card.validate()).filter(status=>!status)

    if(cardsWithInvalidInputs?.length==0){
      this.sendData(this.cards?.map(card=>card.fetchContents()) || [])
        .then(console.log)
        .catch(console.error)
    }
  }

  async sendData(payload:DrugAeCardFormTypes[]){
    return await axios.post(`${environment.BACKEND_URL}/ae/submit`, {
      drugAes: payload
    })
  }

  reset(){
    this.cardIdArray = []
    this.addCard()
  }

  async fetchSampleAndSet():Promise<DrugAeCardFormTypes[]>{
    const res = await axios.get<DrugAeCardFormTypes[]>(`${environment.BACKEND_URL}/ae/get`)
    return res.data
  }

  load(){

    this.cdr.detectChanges()
    this.fetchSampleAndSet().then(arr=>{
      arr.forEach(_=>this.addCard())
      this.cdr.detectChanges()
      arr.map((data, index)=>{
        this.cards?.get(index)?.set(data)
      })

      this.cardIdArray.splice(arr.length)

    }).catch(console.error)
  }

}
