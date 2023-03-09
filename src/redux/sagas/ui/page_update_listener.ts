import { put, select } from 'redux-saga/effects'

import UIActions from '../../actions/ui'

interface IPageUpdateListener {
  payload: {
    currentPage: number
  }
}

export default function* pageUpdateListener({ payload: { currentPage } }: IPageUpdateListener) {
  const characters = yield select(state => state.ui.characters.characters)

  if (characters[currentPage]) {
    return
  }

  yield put(UIActions.loadCharacters(currentPage))
}
