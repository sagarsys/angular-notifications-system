import { Observable } from 'rxjs/internal/Observable';

// if value of css transition duration (ms) is changed --> reflect the change here (& vice versa)
export const NOTIFICATION_ANIM_DURATION = 200;

export class NotificationsConfigModel {
  type: string;
  message: string;
  message$: Observable<string | any>;
  duration: number;
  context?: string;
  cssClasses?: string | string[];
  actions?: NotificationsActionModel[];
  zIndex?: number;
  position?: string;
  additional?: any;
}

export class NotificationsActionModel {
  type: string;
  text: string;
  text$: Observable<string | any>;
}
