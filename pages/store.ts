import { countryReducer } from "@/state/countries/reducer";
import watcherSaga from "@/state/countries/saga";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { all } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()
export default configureStore({
    reducer: {
      getcountries: countryReducer,
    },
    middleware: [sagaMiddleware],
  })

function* rootSaga(): Generator {
    yield all([
      watcherSaga()
    ])
  }

  sagaMiddleware.run(rootSaga)