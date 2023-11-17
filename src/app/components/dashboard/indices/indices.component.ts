import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage'
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})
export class IndicesComponent {
  indices: any;

  constructor(private lss: LocalStorageService, private apiService: NTVoyagerApiWtp){
    
  }

  ngOnInit(){
    this.apiService.v2().subscribe(
      (res) => {
        console.log(res)
        this.lss.set('indices', res);
      },
      (err) => {
        console.log(err)
      }
    )
  } 

  
}
