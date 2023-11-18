import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp, WatchlistDeleteCommand } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-watchlist',
  templateUrl: './delete-watchlist.component.html',
  styleUrls: ['./delete-watchlist.component.css'],
})
export class DeleteWatchlistComponent {
  watchlist: any;
  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
  ) {
    this.watchlist = this.lss.get('watchlist')
  }

  ngOnInit(){
    this.watchlist = this.lss.get('watchlist')
  }

  deleteWatchlist(id: any){
    this.apiService.delete(id as WatchlistDeleteCommand)
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
