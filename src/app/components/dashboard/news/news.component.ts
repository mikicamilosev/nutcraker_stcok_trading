import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor(private lss: LocalStorageService, private apiService: NTVoyagerApiWtp){
    // this.lss.set('newsHeadlines', []);
    // this.apiService.newsHeadlines("2023-11-18T15:13:50.361Z").subscribe(
    //   (res) => {
    //     if(res){
    //       this.lss.set('newsHeadlines', res);
    //     }
    //   }
    // )
  }

  ngOnInit(){
    // this.lss.set('newsHeadlines', []);
    // this.apiService.newsHeadlines("2023-11-18T15:13:50.361Z").subscribe(
    //   (res) => {
    //     if(res){
    //       console.log(res)
    //       this.lss.set('newsHeadlines', res);
    //     }
    //   }
    // )
  }

  ngOnChanges(){

  }
}
