import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-rename-watchlist-name',
  templateUrl: './rename-watchlist-name.component.html',
  styleUrls: ['./rename-watchlist-name.component.css'],
})
export class RenameWatchlistNameComponent {
  watchlist: any;
  renameWatchlistForm: any;

  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
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

  renameExistingWatchlist(){
    console.log(this.renameWatchlistForm.get('watchlistName'))
    this.cancel()
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
