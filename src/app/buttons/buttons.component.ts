import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications/services/notifications.service';
import { NotificationsActionModel, NotificationsConfigModel } from '../notifications/models/notification-config.model';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  /**
   * Static helper to retrieve basic notifications config object
   * @param type
   * @returns NotificationsConfigModel
   */
  private static getConfig(type: string): NotificationsConfigModel {

    let message = '';
    let actions: NotificationsActionModel[] = [];

    if (type === 'success') {
      message = 'Success! Your action was completed.';
    } else if (type === 'error') {
      message = 'Error! An error occurred while completing your action.';
      actions = [{
        type: 'button',
        text: 'Retry?',
      }];
    } else if (type === 'warn') {
      message = 'Action completed with warning.';
      actions = [{
        type: 'link',
        text: 'Google it!',
        link: 'https://google.com'
      }];
    }

    const config = {
      message,
      type,
      duration: 5000
    };

    if (actions.length) {
      return Object.assign({}, config, { actions });
    }

    return config;
  }

  ngOnInit() {
    this.notificationsService.result$.subscribe(result => {
      // retry action click
      if (result) {
        // simulate some delay
        setTimeout(() => {
          this.notificationsService.isDisplayed = true;
          this.notificationsService.config = ButtonsComponent.getConfig('success');
        }, 2000);
      }
    });
  }

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    let type: string = '';
    // set the type based on clicked button
    if (target.classList.contains('btn-success')) {
      type = 'success';
    } else if (target.classList.contains('btn-danger')) {
      type = 'error';
    } else if (target.classList.contains('btn-warning')) {
      type = 'warn';
    }
    // display notification with config based on type
    this.notificationsService.isDisplayed = true;
    this.notificationsService.config = ButtonsComponent.getConfig(type);
  }

}
