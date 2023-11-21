import { createReducer, on } from '@ngrx/store';
import { UpdateMarketData } from './market.action';import { MarketState } from './market.state';

const initialize: MarketState = {
    data: ''
}

export const marketReducer = createReducer(
    initialize,
    on(UpdateMarketData, (state, {data}) => {
        return {
            data: data
        }
    })
)