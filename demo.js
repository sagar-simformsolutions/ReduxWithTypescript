import { Colors, MyThemeType } from '@theme';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import type { DefaultActionTypes } from 'reduxsauce';
import { createActions } from 'reduxsauce';
import type { RootStateType } from '../Store';


import { createReducer } from 'reduxsauce';
import { ImmutableObject } from 'seamless-immutable';
import { INITIAL_STATE, ThemeStateType, ThemeTypes } from '../actor/ThemeActionSelectorAndState';
/* ------------- Initial State ------------- */
export type ThemeStateType = {
  theme: MyThemeType;
};
export const INITIAL_STATE: ImmutableObject<ThemeStateType> = Immutable<ThemeStateType>({
  theme: Colors(true)
});
/* ------------- Types and Action Creators ------------- */
type ThemeActionsType = {
  changeTheme: (theme: MyThemeType) => void;
};
const { Types, Creators } = createActions<DefaultActionTypes, ThemeActionsType>({
  changeTheme: ['theme']
});
export const ThemeTypes = Types;
export const ThemeActions: ThemeActionsType = Creators;
/* ------------- Selectors ------------- */
type ThemeSelectorsType = {
  getData: (state: RootStateType) => ThemeStateType;
  getTheme: (state: RootStateType) => MyThemeType;
};
export const ThemeSelectors: ThemeSelectorsType = {
  getData: (state: RootStateType) => state.theme,
  getTheme: (state: RootStateType) => state.theme.theme
};



/* ------------- Reducers ------------- */
function handleThemeChange(
  state: ImmutableObject<ThemeStateType>,
  { theme }: ThemeStateType
): ImmutableObject<ThemeStateType> {
  return state.merge({ theme });
}
/* ------------- Hookup Reducers To Types ------------- */
export const themeReducer = createReducer<ImmutableObject<ThemeStateType>, { type: any; theme?: ThemeStateType }>(
  INITIAL_STATE,
  {
    [ThemeTypes.CHANGE_THEME]: handleThemeChange
  }
);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;