import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: number): Observable<Leader> {
    return Observable.of(LEADERS.filter((lead) => (lead.id === id))[0]).delay(2000);
  }

//   getFeaturedPromotion(): Promotion {
//     return PROMOTIONS.filter((promotion) => promotion.featured)[0];
//   }
}