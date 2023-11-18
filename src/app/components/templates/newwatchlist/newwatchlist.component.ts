import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private apiService: NTVoyagerApiWtp
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
    // Implement the logic to save the new watchlist here
    this.apiService.addNew(this.watchlistName).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => [
        console.log(err)
      ]
    );
    console.log('Saving new watchlist:', this.watchlistName);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
