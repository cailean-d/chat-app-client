import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationInterface } from '../__interfaces/notification';
import { Response } from '../__interfaces/response';
import { SocketService, SocketEvent } from './socket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

  notifications: NotificationInterface[];

  private notifCount = new BehaviorSubject<number>(0);
  public countCast = this.notifCount.asObservable();

  constructor(
    private http: HttpClient,
    private socket: SocketService
  ) { }

  load(): void {
    this.getData();
    this.listenSocketEvents();
  }

  async getData(): Promise<void> {
    try {
      const response: any = await this.http.get(`api/notification`).toPromise();
      this.notifications = response.data as NotificationInterface[];
      this.setCount(this.notifications.length);
    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

  async deleteNotification(id: number): Promise<void> {
    try {
      const response: any = await this.http.delete(`api/notification/${id}`).toPromise();
    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

  public delete(index: number): void {
    const id = this.notifications[index].id;
    this.deleteNotification(id).then(() => {
      this.notifications.splice(index, 1);
      this.setCount(this.notifications.length);
    });
  }

  private setCount(n: number): void {
    this.notifCount.next(n);
  }

  private listenSocketEvents(): void {
    this.socket.onEvent(SocketEvent.NOTIFICATION).subscribe((data) => {
      const _data: NotificationInterface = JSON.parse(data);
      this.notifications.push({
        id: _data.id,
        message: _data.message,
        date: _data.date
      });
      this.setCount(this.notifications.length);
    });
  }

}
