import { createReducer, on } from '@ngrx/store';
import { UpdateMarketData } from './market.action';import { MarketState } from './market.state';

const initialize: MarketState = {
    status: false
}

export const marketReducer = createReducer(
    initialize,
    on(UpdateMarketData, (state, {status}) => {
        return {
            ...state,
            status: status
        }
    })
)