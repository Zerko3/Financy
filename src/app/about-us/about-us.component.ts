import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AboutUs } from 'src/interfaces/aboutUs.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements AfterViewInit {
  @ViewChild('imgBox') imgBox: ElementRef;
  isInView = false;
  isVisibleObserver: IntersectionObserver;

  // html data
  aboutUsData: AboutUs[] = [
    {
      title: 'Secure transactions',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuganesciunt totam cum ratione provident magnam voluptatem, cupiditateeveniet? Tempore dicta fugiat eius, nostrum sapiente providentobcaecati eum numquam vel totam.',
    },
    {
      title: "User's increase saveings by 5%",
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuganesciunt totam cum ratione provident magnam voluptatem, cupiditateeveniet? Tempore dicta fugiat eius, nostrum sapiente providentobcaecati eum numquam vel totam.',
    },
    {
      title: 'Track your finances',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuganesciunt totam cum ratione provident magnam voluptatem, cupiditateeveniet? Tempore dicta fugiat eius, nostrum sapiente providentobcaecati eum numquam vel totam.',
    },
    {
      title: 'Invest on the go',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuganesciunt totam cum ratione provident magnam voluptatem, cupiditateeveniet? Tempore dicta fugiat eius, nostrum sapiente providentobcaecati eum numquam vel totam.',
    },
  ];

  constructor() {}
  // TODO:
  // 1. Add ngFor to the about me section to render it dynamicly
  // 2. create an array of objects each containing a title and description
  // 3. render all of them to the DOM
  // 4. in scss change the style to :nth-child() to style dynamicly or even loop over the style with the @loop or what ever that syntax is

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
