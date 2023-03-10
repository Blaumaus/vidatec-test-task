import { types } from '../../actions/ui/types'

interface IPlanetReducer {
  planets: {
    [key: string]: any
  }
  error: string | null
}

const getInitialState: () => IPlanetReducer = () => {
  return {
    planets: {}, // { 'https://swapi.dev/api/planets/1/': { ... } }
    error: null,
  }
}

// eslint-disable-next-line default-param-last
const planetReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case types.SET_PLANETS: {
      const { planets } = payload

      return {
        ...state,
        planets: {
          ...state.planets,
          ...planets,
        },
      }
    }

    case types.SET_PLANETS_ERROR: {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }

    default:
      return state
  }
}

export default planetReducer
