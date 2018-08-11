import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NotificationsManagerService } from './notifications/services/notifications-manager.service';
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
  providers: [NotificationsManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
