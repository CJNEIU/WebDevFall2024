import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Extra } from './extra.model';

@Injectable({ providedIn: 'root' })
export class ExtraService {
  private extra: Extra = { 'message': '', 'status': '' };
  private extraUpdated = new Subject<Extra>();

  constructor(private http: HttpClient) {}

  getExtra(){
    this.http.get<{extra:Extra}>('https://dog.ceo/api/breeds/image/random').subscribe((payLoad: any)=>{
        // console.log(payLoad)
        this.extra = payLoad;
        this.extraUpdated.next(this.extra);
    });
  }

  getUpdateExtra(){
    return this.extraUpdated.asObservable();
  }
}
