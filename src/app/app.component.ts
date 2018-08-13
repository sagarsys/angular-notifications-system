import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UnsubscribeHelper } from './shared/helpers/Unsubscribe.helper';
import { NotificationsService } from './notifications/services/notifications.service';
import { NotificationsConfigModel } from './notifications/models/notification-config.model';
import { NotificationsDirective } from './notifications/directives/notifications.directive';
import { NotificationsComponent } from './notifications/components/notifications.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UnsubscribeHelper implements AfterViewInit {

  @ViewChild(NotificationsDirective) notifications: NotificationsDirective;

  isNotificationsVisible: boolean = false;

  constructor(private notificationsService: NotificationsService) {
    super();
  }

  ngAfterViewInit() {
    this.addSubscription(
      this.notificationsService.isDisplayed$.subscribe((isDisplayed: boolean) => {
        this.isNotificationsVisible = isDisplayed;
        if (isDisplayed) {
          this.addSubscription(
            this.notificationsService.config$.subscribe((config: NotificationsConfigModel) => {
              this.notifications.create(NotificationsComponent, config);
            })
          );
        }
      })
    );
  }

}
