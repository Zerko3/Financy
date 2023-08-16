import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements AfterViewInit {
  @ViewChild('imgBox') imgBox: ElementRef;
  isInView = false;
  isVisibleObserver: IntersectionObserver;

  constructor() {}

  ngAfterViewInit(): void {
    // observer
    this.isVisibleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entrie) => {
          if (entrie.isIntersecting) {
            this.isInView = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    this.isVisibleObserver.observe(this.imgBox.nativeElement);
  }
}
