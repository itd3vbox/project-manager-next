import { configureStore, combineReducers } from '@reduxjs/toolkit'
import spaceReducer from './reducers/space/spaceReducer'

const rootReducer = combineReducers({
  space: spaceReducer,
  // Add other reducers if needed
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
