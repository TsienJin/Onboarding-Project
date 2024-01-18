import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline
} from '@ant-design/icons-angular/icons';
import {IconDefinition} from "@ant-design/icons-angular";
import {NZ_ICONS, NzIconModule} from "ng-zorro-antd/icon";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzConfig, provideNzConfig} from "ng-zorro-antd/core/config";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline
];

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240, nzDuration:1500 }
};



@NgModule({
  declarations: [
    // AppComponent
  ],
  imports: [
    BrowserModule,
    NzNotificationModule,
    NzIconModule,
    HttpClientModule,
    NoopAnimationsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons
    },
    provideNzConfig(ngZorroConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
