import { WatchlistDTO, WatchlistInstrumentDTO } from "src/app/services/api.service"

export interface MarketState{
    watchlists: WatchlistDTO[] | WatchlistDTO,
    indexWatchlistId: string,
    watchInstruments: WatchlistInstrumentDTO[],
    instruments: InstrumentProps[]
}

export interface InstrumentProps {
    pesk : string,
    symbol : string,
    name : string,
    BS1 : string,
    B1 : string,
    A1 : string,
    AS1 : string,
    BS2 : string,
    B2 : string,
    A2 : string,
    AS2 : string,
    BS3 : string,
    B3 : string,
    A3 : string,
    AS3 : string,
    LTP : string,
    LTS : string,
    LTT : string,
    Chg : string,
    ChgP : string,
    Cls : string,
    L : string,
    H : string,
    chgColour : string,
}