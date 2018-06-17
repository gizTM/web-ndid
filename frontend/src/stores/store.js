import { createStore } from 'redux'
// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
// import { apiSaga } from '../sagas/saga'

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(apiSaga)

const store = createStore(rootReducer)

export default store
