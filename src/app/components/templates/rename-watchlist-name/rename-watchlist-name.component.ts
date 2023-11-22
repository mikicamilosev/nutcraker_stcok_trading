import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { ToastrService } from 'ngx-toastr';
import { UpdateMarketData } from 'src/app/reducers/market/market.action';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-rename-watchlist-name',
  templateUrl: './rename-watchlist-name.component.html',
  styleUrls: ['./rename-watchlist-name.component.css'],
})
export class RenameWatchlistNameComponent {
  selectedId: any;
  watchlist: any;
  renameWatchlistForm: any;

  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp,
    private notif: ToastrService,
    private store: Store
  ) {}

  ngOnInit() {
    this.watchlist = this.lss.get('watchlist');
    this.renameWatchlistForm = new FormGroup({
      watchlistName: new FormControl(this.watchlist.name, [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }

  ngOnChanges() {
    this.watchlist = this.lss.get('watchlists');
  }

  renameExistingWatchlist(){
    var newName: string = this.renameWatchlistForm.get('watchlistName').value
    var watchlist: any = this.lss.get('watchlist');
    if(watchlist.name == newName){
      this.notif.warning('Input correct name!', 'Warning');
      return;
    }
    var watchlists: any = this.lss.get('watchlists');
    watchlists.forEach((ele: any) => {
      if(ele.name == newName){
        this.notif.warning('Same name is already exist!', 'Warning!')
        return ;
      }
    });
    this.apiService.rename({watchlistId: this.watchlist.id, newName: newName } as any).subscribe(
      (res) => {
        if(res.isSuccess){
          var newWlLists: any = [];
          watchlists.forEach((ele: any) => {
            if(ele.id === this.watchlist.id){
              this.lss.set('watchlist', {id: ele.id, name: newName})
              newWlLists.push({id: ele.id, name: newName})
            } else {
              newWlLists.push(ele)
            }
          });
          this.lss.set('watchlists', newWlLists);
          this.notif.success(res.message, "Success!")
          this.store.dispatch(UpdateMarketData({data: "rename" + watchlist.id}))
          this.cancel()
        } else {
          this.notif.error(res.message, "Error!")
        }
      }
    )
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
