import { Injectable } from '@angular/core';
import { LightstreamerClient } from 'lightstreamer-client-web';

@Injectable({
  providedIn: 'root'
})
export class LstreamerService {

  constructor(
    private lsc: LightstreamerClient
  ) { }
}
