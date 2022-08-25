import { Injectable } from '@angular/core';
import {ToCollect} from './to-collect.viajesfacturar';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViajesfacturarAPIService {

  constructor(private httpClient: HttpClient) { }

  getToCollectInformation(): Observable<ToCollect[]>{
    return this.httpClient.get<ToCollect[]>(`assets/viajesfacturar.json`);
  }
  
}
