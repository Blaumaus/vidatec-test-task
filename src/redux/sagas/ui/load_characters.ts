import { put, call } from 'redux-saga/effects'
import _toString from 'lodash/toString'
import Debug from 'debug'

import UIActions from '../../actions/ui'

import {
  getCharacters,
} from '../../../api'

const debug = Debug('sw-test-task:rx:s:load-characters')

interface ILoadCharacters {
  payload: {
    page: number
  }
}

export default function* loadCharacters({ payload: { page } }: ILoadCharacters) {
  try {
    yield put(UIActions.setCharactersLoading(true))

    const {
      results, count,
    } = yield call(getCharacters, page)

    yield put(UIActions.setCharactersCount(count))
    yield put(UIActions.setCharacters(results, page))
  } catch (e) {
    yield put(UIActions.setCharactersError(_toString(e)))
    debug('failed to load characters: %s', e)
  }
}
