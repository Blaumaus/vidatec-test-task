import { put } from 'redux-saga/effects'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'
import { DEFAULT_CHARACTER_PAGE } from 'redux/constants'

const debug = Debug('sw-test-task:rx:s:initialise')

export default function* initialise() {
  try {
    yield put(UIActions.loadCharacters(DEFAULT_CHARACTER_PAGE))
    yield put(UIActions.loadPlanets())
  } catch (e) {
    debug('An error occured whilst initialising: %s', e)
  }
}
