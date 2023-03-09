import { types } from './types'
import { ICharacter } from '../../adapters/ui'

const loadCharacters = (page: number) => ({
  type: types.LOAD_CHARACTERS,
  payload: {
    page,
  },
})

const setCharacters = (characters: ICharacter[], page: number) => ({
  type: types.SET_CHARACTERS,
  payload: {
    characters, page,
  },
})

const setCharactersError = (error: string) => ({
  type: types.SET_CHARACTERS_ERROR,
  payload: {
    error,
  },
})

const setCharactersLoading = (isLoading: boolean) => ({
  type: types.SET_CHARACTERS_LOADING,
  payload: {
    isLoading,
  },
})

const loadPlanets = () => ({
  type: types.LOAD_PLANETS,
})

const setPlanets = (planets) => ({
  type: types.SET_PLANETS,
  payload: {
    planets,
  },
})

const setPlanetsError = (error: string) => ({
  type: types.SET_PLANETS_ERROR,
  payload: {
    error,
  },
})

const setCharactersCount = (totalCount: number) => ({
  type: types.SET_CHARACTERS_COUNT,
  payload: {
    totalCount,
  },
})

const setCurrentPage = (currentPage: number) => ({
  type: types.SET_CURRENT_PAGE,
  payload: {
    currentPage,
  },
})

const UIActions = {
  loadCharacters,
  setCharacters,
  setCharactersError,
  setCharactersLoading,
  loadPlanets,
  setPlanets,
  setPlanetsError,
  setCharactersCount,
  setCurrentPage,
}

export default UIActions
