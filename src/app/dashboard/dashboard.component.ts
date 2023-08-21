import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentRouter: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRouter = this.router.url;
    console.log(this.currentRouter);
  }

  ngOnDestroy(): void {}
}
