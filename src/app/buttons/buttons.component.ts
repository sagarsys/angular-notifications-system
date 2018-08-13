import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { NotificationsService } from '../notifications/services/notifications.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() { }

  onClick(event: MouseEvent) {
    console.log(event);
    this.notificationsService.isDisplayed = true;
    this.notificationsService.config = {
      message: 'Success!',
      message$: of('Success'),
      type: 'success',
      context: 'app',
      duration: 150000
    };
  }

}
