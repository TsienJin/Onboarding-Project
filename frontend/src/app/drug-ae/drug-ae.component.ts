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

  /**
   * Add additional DrugAE Pair card
   */
  addCard() {
    this.cardIdArray.push(++this.cardIdUniqueIndex)
  }

  /**
   * Delete card with given index
   * @param id {number}
   */
  deleteCard(id:number){
    this.cardIdArray.splice(this.cardIdArray.indexOf(id), 1)
  }


  /**
   * Method to fetch all card info and send to backend
   */
  submit(){

    // Get array of false for each invalid card
    const cardsWithInvalidInputs = this.cards
      ?.map(card=>card.validate()) // call child validate()
      .filter(status=>!status) // filter for statuses that are false

    // If there are no false inputs
    if(cardsWithInvalidInputs?.length==0){

      // Iterate over all children and map its contents to an arr
      this.sendData(this.cards?.map(card=>card.fetchContents()) || [])
        .then(console.log)
        .catch(console.error)
    }
  }

  /**
   * Async method to send data to backend
   * @param payload {DrugAeCardFormTypes[]}
   */
  async sendData(payload:DrugAeCardFormTypes[]){
    return await axios.post(`${environment.BACKEND_URL}/ae/submit`, {
      drugAes: payload
    })
  }

  /**
   * Reset all cards
   */
  reset(){

    // Remove all existing cards
    this.cardIdArray = []

    // Create ONE card
    this.addCard()
  }

  /**
   * Method to get information from the backend
   * @return {Promise<DrugAeCardFormTypes[]>}
   */
  async fetchSampleAndSet():Promise<DrugAeCardFormTypes[]>{
    const res = await axios.get<DrugAeCardFormTypes[]>(`${environment.BACKEND_URL}/ae/get`)
    return res.data
  }

  /**
   * Method to update cards with backend information
   */
  load(){

    // Upload child arr in this element
    this.cdr.detectChanges()

    // Fetch data then iterate over them
    this.fetchSampleAndSet().then(arr=>{

      // add the correct number of cards (min)
      arr.forEach(_=>this.addCard())

      // Updates children in this component to reflect an accurate list
      this.cdr.detectChanges()

      // For each child, set data
      arr.map((data, index)=>{
        this.cards?.get(index)?.set(data)
      })

      // Remove excess cards.
      this.cardIdArray.splice(arr.length)

    }).catch(console.error)
  }

}
