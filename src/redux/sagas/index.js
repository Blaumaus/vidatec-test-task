import { fork } from 'redux-saga/effects'
import uiSaga from './ui'

export default function* rootSaga() {
  yield fork(uiSaga)
}
