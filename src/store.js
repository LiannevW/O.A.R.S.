import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import {responsiveStoreEnhancer} from 'redux-responsive';
import {responsiveStateReducer} from 'redux-responsive'
import {responsiveDrawer} from 'material-ui-responsive-drawer';


import reducers from './reducers'
const reducer = combineReducers({
  ...reducers,
  router: routerReducer,
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
})

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f

export const history = createHistory()

const middleware = [
  routerMiddleware(history),
  ReduxThunk
]

const enhancer = compose(
  applyMiddleware(...middleware),
  devTools
)

const store = createStore(reducer, enhancer, responsiveStoreEnhancer)

export default store
