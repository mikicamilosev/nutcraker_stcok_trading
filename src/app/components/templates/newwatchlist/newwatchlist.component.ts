import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { ToastrService } from 'ngx-toastr';
import { UpdateMarketData } from 'src/app/reducers/market/market.action';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-newwatchlist',
  templateUrl: './newwatchlist.component.html',
  styleUrls: ['./newwatchlist.component.css'],
})
export class NewwatchlistComponent implements OnInit {
  newWatchlistForm: any;
  watchlistName: any;

  constructor(
    private activeModal: NgbActiveModal,
    private apiService: NTVoyagerApiWtp,
    private lss: LocalStorageService,
    private notif: ToastrService,
    private store: Store
  ) {
    this.watchlistName = '';
  }

  ngOnInit() {
    this.newWatchlistForm = new FormGroup({
      watchlistName: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }

  saveNewWatchlist() {
    var newName = this.newWatchlistForm.get('watchlistName').value;
    var oldWlLists: any = this.lss.get('watchlists');
    var newId = Number(oldWlLists[oldWlLists.length - 1].id) + 1;
    // same name ?
    oldWlLists.forEach((ele: any) => {
      if(ele.name === newName){
        this.notif.warning("Same Watchlist is already exist!", "Warning")
        return ;
      }
    });
    // Implement the logic to save the new watchlist here
    this.apiService.addNew({name: newName, pesks: []} as any).subscribe(
      (res) => {
        if(res.isSuccess){
          oldWlLists.push({id: newName, name: newName});
          this.lss.set('watchlists', oldWlLists);
          this.notif.success(res.message, "Success!");
          this.store.dispatch(UpdateMarketData({data: "newWl" + ""}))
          this.cancel()
        } else {
          this.notif.error(res.message, "Error!")
        }
      },
      (err) => {
        console.log(err)
      }
    )
    console.log('Saving new watchlist:', this.watchlistName);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
