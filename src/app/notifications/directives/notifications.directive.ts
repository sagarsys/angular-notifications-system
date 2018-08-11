import { ComponentFactoryResolver, ComponentRef, Directive, ViewContainerRef } from '@angular/core';
import { UnsubscribeHelper } from '../../shared/helpers/Unsubscribe.helper';
import { NotificationsService } from '../services/notifications.service';
import { NotificationsComponent } from '../components/notifications.component';
import { NOTIFICATION_ANIM_DURATION, NotificationsConfigModel } from '../models/notification-config.model';

@Directive({ selector: '[appNotifications]' })
export class NotificationsDirective extends UnsubscribeHelper {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private factoryResolver: ComponentFactoryResolver,
    private notificationsService: NotificationsService,
  ) {
    super();
  }

  create(
    notificationsComponent: { new(...args: any[]): NotificationsComponent },
    data: NotificationsConfigModel = null,
  ): ComponentRef<NotificationsComponent> {
    // remove any previous instance
    this.viewContainerRef.clear();
    // resolve and create component
    const notificationsFactory = this.factoryResolver.resolveComponentFactory(NotificationsComponent);
    const notificationsCompRef = this.viewContainerRef.createComponent(notificationsFactory);
    // add data to notifications if present
    if (data) {
      notificationsCompRef.instance.data = Object.assign({}, notificationsCompRef.instance.data, data);
    }
    // event listener for close event
    this.addSubscription(
      notificationsCompRef.instance.close.subscribe((value: any) => {
        // if user clicks on an action, pass the result before close
        if (value) {
          this.notificationsService.result = value;
        }
        // wait for animation and destroy notification
        setTimeout(() => notificationsCompRef.destroy(), NOTIFICATION_ANIM_DURATION);
      })
    );
    return notificationsCompRef;
  }

}
