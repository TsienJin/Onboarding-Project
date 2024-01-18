import {Component, OnInit} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import axios from "axios";
import {environment} from "../../environment/environment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzCardComponent,
    NzTypographyComponent,
    NzDividerComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzTooltipDirective,
    NzIconDirective,
    NzFormDirective,
    NzFormItemComponent,
    NzButtonComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{

  username:string = ""
  password:string = ""

  loading:boolean = false

  constructor(
  ) {}

  onUsernameChange(event: KeyboardEvent) {
    this.username = (event.target as HTMLInputElement).value
  }

  onPasswordChange(event: KeyboardEvent){
    this.password = (event.target as HTMLInputElement).value
  }

  async sendForm():Promise<void>{
    const res = await axios.post(
      `${environment.BACKEND_URL}/user/login`,
      {
        username: this.username,
        password: this.password,
      }
    )
  }

  submitForm(event:any){
    event.preventDefault()
    console.log(this.username, this.password)
    if(this.username && this.password){
      this.loading=true
      this.sendForm()
        .then(()=>{
          this.loading=false
          window.location.href="/drug-ae"
        })
        .catch(error=>{
          this.loading = false
          console.error(error)
        })
    }
  }

}
