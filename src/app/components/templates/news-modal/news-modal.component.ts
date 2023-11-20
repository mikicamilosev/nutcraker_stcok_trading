import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})
export class NewsModalComponent {
  constructor(
    private activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){

  }

  ngOnChanges(){

  }

  cancel(){
    this.activeModal.dismiss()
  }
}
