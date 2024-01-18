import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzTypographyComponent} from "ng-zorro-antd/typography";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
    NzButtonComponent,
    NzSpaceComponent,
    NzRowDirective,
    NzColDirective,
    NzSpaceItemDirective,
    NzDividerComponent,
    NzTypographyComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
