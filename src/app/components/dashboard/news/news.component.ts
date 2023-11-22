import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { NewsModalComponent } from '../../templates/news-modal/news-modal.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  @Input() exchange: any;
  newsHeadlines: any;
  updateDate: any

  constructor(private lss: LocalStorageService, private apiService: NTVoyagerApiWtp,
    private modalService: NgbModal){
  }

  ngOnInit(){
    this.apiService.newsHeadlines(this.exchange, '').subscribe(
      (res) => {
        if(res){
          this.newsHeadlines = res;
          this.updateDate = new Date()
        }
      }
    )
  }

  ngOnChanges(){
    this.apiService.newsHeadlines(this.exchange, '').subscribe(
      (res) => {
        if(res){
          this.newsHeadlines = res;
          this.updateDate = new Date()
        }
      }
    )
  }

  showNewsContent(id: string){
    const modalRef = this.modalService.open(NewsModalComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    modalRef.componentInstance.newsId = id;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }
}
