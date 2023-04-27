import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducers/userReducer';
import employeeReducer from './reducers/employeeReducer';
import designationReducer from './reducers/designationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  designations: designationReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)