import { createAction, props } from '@ngrx/store';

export const UpdateMarketData = createAction(
    '[Market] Update Data',
    props<{status: boolean}>()
)