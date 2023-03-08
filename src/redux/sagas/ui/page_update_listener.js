import { put, select } from 'redux-saga/effects'

import UIActions from 'redux/actions/ui'

export default function* loadCharacters({ payload: { currentPage } }) {
  const characters = yield select(state => state.ui.characters.characters)

  if (characters[currentPage]) {
    return
  }

  yield put(UIActions.loadCharacters(currentPage))
}
