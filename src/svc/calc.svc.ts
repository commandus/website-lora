import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Version } from '../model/version';
import { NetId } from '../model/netid';
import { KeyGenResponse } from '../model/keygenresponse';
import { ClassResponse } from '../model/classesresponse';
import { RFM } from '../model/rfm';
import { GwResponse } from '../model/gwresponse';

class EndPoint {
  public url = '';
  public name = '';
}

// const svc = 'https://' + window.location.hostname;
// const svc = '';
const svc = 'https://lora.commandus.com';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  constructor(private httpClient: HttpClient) { }
  public endpoint: EndPoint = { url: svc + '/json/clause', name: 'server-side'};

  version(): Observable<Version> {
    const request = ['version'];
    return this.httpClient.post<Version>(this.endpoint.url, request);
  }
  netid(aAddr: string): Observable<NetId> {
    const request = ['netid',  aAddr];
    return this.httpClient.post<NetId>(this.endpoint.url, request);
  }
  addrs(typ: number, nwkId: string): Observable<NetId> {
    const request = ['addrs',  typ, nwkId];
    return this.httpClient.post<NetId>(this.endpoint.url, request);
  }
  keygen(aMasterKey: string, aAddr: string): Observable<KeyGenResponse> {
    const request = ['keygen',  aMasterKey, aAddr];
    return this.httpClient.post<KeyGenResponse>(this.endpoint.url, request);
  }
  rfm(hex: string): Observable<RFM> {
    const request = ['rfm',  hex];
    return this.httpClient.post<RFM>(this.endpoint.url, request);
  }
  gw(hex: string): Observable<GwResponse> {
    const request = ['gw',  hex];
    return this.httpClient.post<GwResponse>(this.endpoint.url, request);
  }
  classes(): Observable<ClassResponse[]> {
    const request = ['classes'];
    return this.httpClient.post<ClassResponse[]>(this.endpoint.url, request);
  }
}
