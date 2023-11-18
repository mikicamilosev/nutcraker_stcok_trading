import { Component, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stockInfo: any;
  selectedTab: any;

  constructor(private lss: LocalStorageService){
    this.stockInfo = this.lss.get('stockInfo')
  }

  ngOnInit(){
    this.stockInfo = this.lss.get('stockInfo')
  }


  ngOnChanges(){
    this.stockInfo = this.lss.get('stockInfo')
  }

  isSelectedTab(tabName: string): boolean {
    return this.selectedTab === tabName;
  }
}
