import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedbackForm(feedback: Feedback): Observable<Feedback> {
    return this.restangular.all('feedback').post(feedback);
  }

}
