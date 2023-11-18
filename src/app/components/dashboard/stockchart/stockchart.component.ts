import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-stockchart',
  templateUrl: './stockchart.component.html',
  styleUrls: ['./stockchart.component.css'],
})
export class StockchartComponent {
  constructor(private store: Store) {
        
  }

  ngOnInit() {

  }
  
  ngOnChanges() {
    
  }
}
