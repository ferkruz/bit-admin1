import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  constructor() { }

  //The set method is use for encrypt the value.
  set(keys: string, value: string) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });


      return encrypted.toString();
    }

    //The get method is use for decrypt the value.
    get(psw: string, value: string){
      const utf8 = CryptoJS.enc.Base64.parse(value);
      return JSON.parse(CryptoJS.AES.decrypt(utf8.toString(), psw).toString(CryptoJS.enc.Utf8));
    }
  }
