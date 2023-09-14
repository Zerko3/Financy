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
        'We prioritize the security of your financial transactions above all else. We employ state-of-the-art encryption and security protocols to ensure that your personal and financial data is safeguarded at every step. Rest easy knowing that your money is in safe hands, allowing you to focus on your financial goals with peace of mind.',
    },
    {
      title: "User's increase saveings by 5%",
      description:
        'With our innovative tools and expert insights, our users have consistently seen their savings increase by an average of 5%. We are here to empower you to reach your financial goals faster, whether it is building an emergency fund, saving for a dream vacation, or planning for retirement.',
    },
    {
      title: 'Track your finances',
      description:
        'Gain complete control over your finances. Our user-friendly interface and powerful tracking tools allow you to monitor your spending, set budget goals, and visualize your financial progress with ease.',
    },
    {
      title: 'Invest on the go',
      description:
        'Our mobile app provides a seamless and intuitive platform for managing your investments, whether you are a seasoned investor or just getting started. Take control of your financial future and invest at your convenience with us.',
    },
  ];

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
