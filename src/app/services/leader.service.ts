import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) { }
  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true}).pipe(map(leader => leader[0]));
  }
}

