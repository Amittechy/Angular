import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 constructor( private dishservice: DishService, @Inject('BaseURL') private BaseURL) { }

 dishes: Dish[];


  ngOnInit() {
    this.dishservice.getDishes().subscribe( dishes => {
      this.dishes = dishes;
    });
  }
}
