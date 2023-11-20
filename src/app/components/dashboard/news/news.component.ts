import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  @Input() exchange: any;
  newsHeadlines: any;
  constructor(private lss: LocalStorageService, private apiService: NTVoyagerApiWtp){
  }

  ngOnInit(){
    this.apiService.newsHeadlines(this.exchange).subscribe(
      (res) => {
        if(res){
          this.newsHeadlines = res;
        }
      }
    )
  }

  ngOnChanges(){
    this.apiService.newsHeadlines(this.exchange).subscribe(
      (res) => {
        if(res){
          this.newsHeadlines = res;
        }
      }
    )
  }
}
