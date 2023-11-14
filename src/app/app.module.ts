import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
