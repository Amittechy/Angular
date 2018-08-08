import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut , expand } from '../animations/app.animation';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
 constructor( private dishservice: DishService, @Inject('BaseURL') private BaseURL) { }

 dishes: Dish[];
 dishErrMess: String;


  ngOnInit() {
    this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes,  errmess => this.dishErrMess = <any>errmess.message);
    }
  }

