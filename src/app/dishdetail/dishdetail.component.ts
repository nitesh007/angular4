import { Component, OnInit } from '@angular/core';
import{Dish} from '../shared/dish';
import{DishService} from '../services/dish.service';
import 'rxjs/add/operator/switchMap';
import {Params, ActivatedRoute} from '@angular/router';
import{Location} from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  feedbackForm: FormGroup;
  dish = new Dish();
  constructor(private dishservice:DishService,
              private fb: FormBuilder,
              private route:ActivatedRoute,
              private location:Location) { this.createForm()}

  dishIds: number[];
  prev: number;
  next: number;
  
  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  formErrors = {
    'firstname': '',
    'feedback': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'feedback': {
      'required': 'Last Name is required.'
    }
  };
  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      rating: [1, [Validators.required]],
      feedback: ['', [Validators.required]]    
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  giveReview(){
    let value = this.feedbackForm.value;
    value.date = new Date();
    value.comment = this.feedbackForm.value.feedback;
    value.author = this.feedbackForm.value.firstname;
    this.dish.comments.push(value);
    this.feedbackForm.reset();
  }
  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
  goBack():void{
    this.location.back();
  }
}
