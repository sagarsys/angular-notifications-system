import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UnsubscribeHelper } from '../../shared/helpers/Unsubscribe.helper';
import { NOTIFICATION_ANIM_DURATION, NotificationsActionModel, NotificationsConfigModel } from '../models/notification-config.model';
import { NotificationsManagerService } from '../services/notifications-manager.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent extends UnsubscribeHelper implements OnInit {

  @ViewChild('notifications') element: ElementRef;

  public readonly _SUCCESS = 'success';
  public readonly _ERROR = 'error';
  public readonly _WARN = 'warn';

  public data: NotificationsConfigModel;
  public close: EventEmitter<any>;

  constructor(
    private notificationsManagerService: NotificationsManagerService,
    private renderer: Renderer2,
  ) {
    super();
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    this.renderOptions();
    setTimeout(() => this.element.nativeElement.classList.add('in'), 0);
  }

  onClose(value: NotificationsActionModel = null) {
    this.element.nativeElement.classList.remove('in');
    setTimeout(() => {
      this.close.emit(value);
      this.notificationsManagerService.isDisplayed = false;
    }, NOTIFICATION_ANIM_DURATION);
  }

  onClick(event: MouseEvent, action: any) {
    event.preventDefault();
    this.onClose(action);
  }

  renderOptions() {
    // duration
    if ( this.data.duration ) {
      setTimeout(() => this.onClose(), this.data.duration);
    }
    // css classes
    if ( this.data.cssClasses ) {
      if ( typeof this.data.cssClasses === 'string' ) {
        this.element.nativeElement.classList.add(this.data.cssClasses);
      } else {
        this.data.cssClasses.map((cssClass: string) => this.element.nativeElement.classList.add(cssClass));
      }
    }
    // z-index
    if ( this.data.zIndex ) {
      this.renderer.setStyle(this.element.nativeElement, 'z-index', this.data.zIndex);
    }
    // custom positions
    if ( this.data.position ) {
      // TODO: Implement custom positioning
    }
  }

}
