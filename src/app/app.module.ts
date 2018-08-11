import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NotificationsService } from './notifications/services/notifications.service';
import { NotificationsDirective } from './notifications/directives/notifications.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    NotificationsDirective,
  ],
  entryComponents: [
    NotificationsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
