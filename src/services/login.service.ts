import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carousel } from 'src/interfaces/carousel.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
  carouselArray: Carousel[] = [
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Mark Willson',
    },
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Jonna Morgan',
    },
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Bob Teemo',
    },
  ];

  username: string = '';
  constructor(private http: HttpClient) {}

  // TODO:
  // get user data
  getUserDataFromFirebase() {
    this.http.get('');
  }

  storeUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
