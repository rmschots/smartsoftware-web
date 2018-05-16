import { Injectable } from '@angular/core';

declare let fbq: Function;

@Injectable()
export class FacebookService {


  sendCustomEvent(eventName: string, event?: object) {
    fbq('trackCustom', eventName, event ? event : null);
  }

}
