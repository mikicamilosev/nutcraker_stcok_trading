import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/includes/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { FixdashboardComponent } from './pages/fixdashboard/fixdashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { WatchlistComponent } from './components/dashboard/watchlist/watchlist.component';
import { IndicesComponent } from './components/dashboard/indices/indices.component';
import { StockInfoComponent } from './components/dashboard/stock-info/stock-info.component';
import { NewsComponent } from './components/dashboard/news/news.component';
import { MarketMoversComponent } from './components/dashboard/market-movers/market-movers.component';
import { OrderbookComponent } from './components/fixDashboard/orderbook/orderbook.component';
import { TradebookComponent } from './components/fixDashboard/tradebook/tradebook.component';
import { PositionsComponent } from './components/fixDashboard/positions/positions.component';
import { StockchartComponent } from './components/dashboard/stockchart/stockchart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { metaReducers, reducers } from './reducers/index.reducer';
import { TestDataService } from './services/test-data.service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NTVoyagerApiWtp } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageDirective, LocalStorageService } from 'ngx-localstorage';
import { WatchlistService } from './services/watchlist.service';
import { NewwatchlistComponent } from './components/templates/newwatchlist/newwatchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FixdashboardComponent,
    AboutComponent,
    WatchlistComponent,
    IndicesComponent,
    StockInfoComponent,
    NewsComponent,
    MarketMoversComponent,
    OrderbookComponent,
    TradebookComponent,
    PositionsComponent,
    StockchartComponent,
    NewwatchlistComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
      metaReducers,
    }),
    // EffectsModule.forRoot(AuthEffects),
    HttpClientModule,
    LocalStorageDirective,
  ],
  providers: [
    TestDataService,
    NTVoyagerApiWtp,
    LocalStorageService,
    WatchlistService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
