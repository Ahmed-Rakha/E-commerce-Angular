import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { LanguageService } from '../cart.service';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  providers: [],
})
export class CounterPageComponent {
  counter = 0;
  constructor(private languageService: LanguageService) {}
  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe((newLang) => {
      console.log(newLang);
      if (newLang === 'en') {
        this.counter = 0;
      } else {
        this.counter = 1;
      }
    });
  }
}
