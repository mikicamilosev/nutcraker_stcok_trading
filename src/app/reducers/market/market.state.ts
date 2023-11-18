import { WatchlistDTO, WatchlistInstrumentDTO } from "src/app/services/api.service"

export interface MarketState{
    watchlists: WatchlistDTO[] | WatchlistDTO,
    indexWatchlistId: string,
    watchInstruments: WatchlistInstrumentDTO[]
}