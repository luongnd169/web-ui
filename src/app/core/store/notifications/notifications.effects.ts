/*
 * Lumeer: Modern Data Definition and Processing Platform
 *
 * Copyright (C) since 2017 Answer Institute, s.r.o. and/or its affiliates.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {SnotifyButton} from 'ng-snotify';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {NotificationService} from '../../notifications/notification.service';
import {AppState} from '../app.state';
import {NotificationsAction, NotificationsActionType} from './notifications.action';

@Injectable()
export class NotificationsEffects {

  @Effect({dispatch: false})
  public confirm$: Observable<Action> = this.actions.ofType(NotificationsActionType.CONFIRM).pipe(
    tap((action: NotificationsAction.Confirm) => {
      const yesButtonText = this.i18n({id: 'button.yes', value: 'Yes'});
      const noButtonText = this.i18n({id: 'button.no', value: 'No'});

      const buttons: SnotifyButton[] = [
        {text: yesButtonText, action: () => this.store$.dispatch(action.payload.action)},
        {text: noButtonText}
      ];
      this.notificationService.confirm(action.payload.message, action.payload.title, buttons);
    })
  );

  @Effect({dispatch: false})
  public error$: Observable<Action> = this.actions.ofType(NotificationsActionType.ERROR).pipe(
    tap((action: NotificationsAction.Error) => this.notificationService.error(action.payload.message))
  );

  @Effect({dispatch: false})
  public success$: Observable<Action> = this.actions.ofType(NotificationsActionType.SUCCESS).pipe(
    tap((action: NotificationsAction.Success) => this.notificationService.success(action.payload.message))
  );

  @Effect({dispatch: false})
  public warning$: Observable<Action> = this.actions.ofType(NotificationsActionType.WARNING).pipe(
    tap((action: NotificationsAction.Warning) => this.notificationService.warning(action.payload.message))
  );

  constructor(private actions: Actions,
              private i18n: I18n,
              private notificationService: NotificationService,
              private store$: Store<AppState>) {
  }
}
