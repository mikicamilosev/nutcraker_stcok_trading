import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { CancelOrderComponent } from '../../templates/cancel-order/cancel-order.component';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.css']
})
export class OrderbookComponent {
  @Input() updateDate: any;
  @Input() selAcc: any
  orderbook: any;
  openOrdersOnly: any;
  
  constructor(
    private apiService: NTVoyagerApiWtp,
    private notif: ToastrService,
    private modalService: NgbModal,
    private lss: LocalStorageService
  ) {
    this.selAcc = '';
    var openOrdersOnly = this.lss.get('trdOrdOpen')
    if(openOrdersOnly == null){
      this.openOrdersOnly = false;
    } else {
      this.openOrdersOnly = openOrdersOnly;
    }
  }

  ngOnInit(){
    this.apiService.orders(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res: any) => {
        this.orderbook = res;
      }
    )
  }

  handleOpenOrdersOnly() {
    this.openOrdersOnly = !this.openOrdersOnly
    this.lss.set('trdOrdOpen', this.openOrdersOnly);
  }

  convertType (orderType : any) {
    switch (orderType) {
        case "LO":
            return "Limit Order";
        case "MO":
            return "Market Order";
        case "SL":
            return "Stop Limit";
        case "SO":
            return "Stop Order";
        default:
            return orderType;
    }
  }

  convertSide (orderSide: any) {
    switch (orderSide) {
        case "B":
            return "Buy";
        case "S":
            return "Sell";
        case "OL":
            return "Open Long";
        case "CL":
            return "Close Long";
        case "OS":
            return "Open Short";
        case "CS":
            return "Close Short";
        default:
            return orderSide;
    }
  };

  convertLifeTime (orderLifeTime: any) {
    switch (orderLifeTime) {
        case "GFD":
            return "Day Order";
        case "GTC":
            return "Good til Cancel";
        default:
            return orderLifeTime;
    }
  };

  cancelOrder(item: any){
    const modalRef = this.modalService.open(CancelOrderComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    // modalRef.componentInstance.instrumentCollection = data.items;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
    // this.apiService.orderCancel({nutcrackerOrderId: item.nutcrackerOrderId, }).subscribe(
    //   (res) => {
    //     if(res.isSuccess){
    //       this.notif.success(res.message, "Success!")
    //     } else {
    //       this.notif.error(res.message, "Error!")
    //     }
    //   }
    // )
  }
}
