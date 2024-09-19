import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  private counter = new BehaviorSubject<number>(0);
  getCounter() {
    return this.counter.asObservable();
  }

  updateCounterVal(newVal: number) {
    this.counter.next(newVal);
  }
  // incrementCounter() {
  //   this.updateCounterVal(this.getCounter() + 1);
  // }
  // decrementCounter() {
  //   this.updateCounterVal(this.getCounter() - 1);
  // }
}

//  in file service.ts
