import { ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationsConfigModel } from '../models/notification-config.model';
import { NotificationsComponent } from '../components/notifications.component';

@Injectable()
export class NotificationsService {

  private _isDisplayed$: Subject<boolean>;
  private _result$: Subject<any>;
  private _config$: Subject<NotificationsConfigModel>;
  private _ref$: Subject<ComponentRef<NotificationsComponent>>;

  constructor() {
    this._isDisplayed$ = new Subject();
    this._result$ = new Subject();
    this._config$ = new Subject();
    this._ref$ = new Subject();
  }

  get isDisplayed$(): Observable<boolean> {
    return this._isDisplayed$.asObservable();
  }

  set isDisplayed(state: boolean) {
    this._isDisplayed$.next(state);
  }

  get result$(): Observable<any> {
    return this._result$.asObservable();
  }

  set result(value: any) {
    this._result$.next(value);
  }

  get config$(): Observable<NotificationsConfigModel> {
    return this._config$.asObservable();
  }

  set config(value: NotificationsConfigModel) {
    this._config$.next(value);
  }

  get ref$(): Observable<ComponentRef<NotificationsComponent>> {
    return this._ref$.asObservable();
  }

  set ref(compRef: ComponentRef<NotificationsComponent>) {
    this._ref$.next(compRef);
  }

}
