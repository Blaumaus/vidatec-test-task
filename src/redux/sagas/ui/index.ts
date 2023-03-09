import { fork, takeEvery } from 'redux-saga/effects'

import { types } from '../../actions/ui/types'
import initialise from './initialise'
import loadCharacters from './load_characters'
import loadPlanets from './load_planets'
import pageUpdateListener from './page_update_listener'

function* mainUISaga() {
  yield fork(initialise)
  // @ts-ignore
  yield takeEvery(types.LOAD_CHARACTERS, loadCharacters)
  // @ts-ignore
  yield takeEvery(types.LOAD_PLANETS, loadPlanets)
  // @ts-ignore
  yield takeEvery(types.SET_CURRENT_PAGE, pageUpdateListener)
}

export default mainUISaga
