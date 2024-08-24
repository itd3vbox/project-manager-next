/* eslint-disable */

// spaceActions.ts

export interface User {}

export interface SpaceState
{
  isSigned: boolean
  user: User
}

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signIn = (user: User, ) => ({
  type: SIGN_IN as typeof SIGN_IN,
  payload: { user, },
})

export const signOut = () => ({
  type: SIGN_OUT as typeof SIGN_OUT,
})

export type SpaceAction =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signOut>
