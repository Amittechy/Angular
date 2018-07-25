import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 constructor( private dishservice: DishService) { }

 dishes: Dish[];
  selectedDish: Dish;

  ngOnInit() {
    this.dishes = this.dishservice.getDishes();
  }
  onSelect(dish: Dish) {
     this.selectedDish = dish;

  }
}
