import { Component } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent {

  constructor(private apiservice: NTVoyagerApiWtp){

  }

  ngOnInit(){
    
  }
}
