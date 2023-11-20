import { createAction, props } from '@ngrx/store';

/**
 * New Action
 */

// update watchlists

export const updateWatchlists = createAction(
  '[Market] Update Watchlists',
  props<{ watchlists: Array<any>}>()
)
