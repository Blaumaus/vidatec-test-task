import { put, call, select } from 'redux-saga/effects'
import _toString from 'lodash/toString'
import _isEmpty from 'lodash/isEmpty'
import Debug from 'debug'

import UIActions from '../../actions/ui'
import { planetsAdapter } from '../../adapters/ui'

import {
  getPlanets, customRequest,
} from '../../../api'

const debug = Debug('sw-test-task:rx:s:load-planets')

export default function* loadPlanets() {
  try {
    const planets = yield select(state => state.ui.planets.planets)

    if (!_isEmpty(planets)) {
      return
    }

    let {
      // eslint-disable-next-line prefer-const
      results, next,
    } = yield call(getPlanets)

    const adapted = planetsAdapter(results)
    yield put(UIActions.setPlanets(adapted))

    while (next) {
      const {
        results: nextResults, next: nextNext,
      } = yield call(customRequest, next, 'get')

      next = nextNext

      const nextAdapted = planetsAdapter(nextResults)
      yield put(UIActions.setPlanets(nextAdapted))
    }
  } catch (e) {
    yield put(UIActions.setPlanetsError(_toString(e)))
    debug('failed to load planets: %s', e)
  }
}
