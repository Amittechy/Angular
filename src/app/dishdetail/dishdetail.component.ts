import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment} from '../shared/comment';







@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('rform') ratingFormDirective;
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  ratingForm: FormGroup;
  comment: Comment;
 dishErrMess: String;
 visibility = 'shown';





  formErrors = {
    'author': '',
    'comment': ''
  };


  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name Must be atleast 2 characters'

    },
    'comment': {
      'required': 'Comment is required'
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute, private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createRatingForm();
  }


  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      // tslint:disable-next-line:max-line-length
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';  }, errmess => this.dishErrMess = <any>errmess.message);
  }
  createRatingForm(): void {
    this.ratingForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [''],
      comment: ['', [Validators.required]]
    });
    this.ratingForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.ratingForm) { return; }
    const form = this.ratingForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.ratingForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    this.ratingForm.reset({
      author: '',
      rating: 5 ,
      comment: ''
    });
    this.ratingFormDirective.resetForm();
  }
}
