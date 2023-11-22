import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { ToastrService } from 'ngx-toastr';
import { UpdateMarketData } from 'src/app/reducers/market/market.action';
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
    private apiService: NTVoyagerApiWtp,
    private notif: ToastrService,
    private store: Store
  ) {
    this.watchlist = this.lss.get('watchlist')
  }

  ngOnInit(){
    this.watchlist = this.lss.get('watchlist')
  }

  deleteWatchlist(id: any){
    var oldWlLists: any = this.lss.get('watchlists');
    this.apiService.delete({watchlistId: id} as any).subscribe(
      (res) => {
        if(res.isSuccess){
          var newWlLists: any = [];
          oldWlLists.forEach((ele: any) => {
            if(ele.id !== id){
              newWlLists.push(ele);
            }
          })
          this.lss.set('watchlists', newWlLists);
          this.lss.set('watchlist', newWlLists[0]);
          this.notif.success(res.message, "Success!")
          this.apiService.instrumentsAll(newWlLists[0].id).subscribe(
            (res) => {
              this.lss.set('instruments', res);
              this.store.dispatch(UpdateMarketData({data: "del" + id}));
              this.cancel()
            }
          )
        }
      }
    )
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
