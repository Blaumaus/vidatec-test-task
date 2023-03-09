import { types } from '../../actions/ui/types'
import { DEFAULT_CHARACTER_PAGE } from '../../constants'

interface ICharacterReducer {
  characters: {
    [key: number]: any
  }
  isLoading: boolean
  error: string | null
  currentPage: number
  totalCount: number
}

const getInitialState: () => ICharacterReducer = () => {
  return {
    characters: {}, // { 1: {} }; i.e. per page
    isLoading: true,
    error: null,
    currentPage: DEFAULT_CHARACTER_PAGE,
    totalCount: 0,
  }
}

// eslint-disable-next-line default-param-last
const characterReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case types.SET_CHARACTERS: {
      const { characters, page } = payload

      return {
        ...state,
        characters: {
          ...state.characters,
          [page]: characters,
        },
        isLoading: false,
      }
    }

    case types.SET_CHARACTERS_ERROR: {
      const { error } = payload
      return {
        ...state,
        error,
      }
    }

    case types.SET_CHARACTERS_COUNT: {
      const { totalCount } = payload

      return {
        ...state,
        totalCount,
      }
    }

    case types.SET_CURRENT_PAGE: {
      const { currentPage } = payload

      return {
        ...state,
        currentPage,
      }
    }

    case types.SET_CHARACTERS_LOADING: {
      const { isLoading } = payload

      return {
        ...state,
        isLoading,
      }
    }

    default:
      return state
  }
}

export default characterReducer
