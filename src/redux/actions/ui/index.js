import { types } from './types'

const loadCharacters = (page) => ({
  type: types.LOAD_CHARACTERS,
  payload: {
    page,
  },
})

const setCharacters = (characters, page) => ({
  type: types.SET_CHARACTERS,
  payload: {
    characters, page,
  },
})

const setCharactersError = (error) => ({
  type: types.SET_CHARACTERS_ERROR,
  payload: {
    error,
  },
})

const setCharactersLoading = (isLoading) => ({
  type: types.SET_CHARACTERS_LOADING,
  payload: {
    isLoading,
  },
})

const loadPlanets = (characters) => ({
  type: types.LOAD_PLANETS,
  payload: {
    characters,
  },
})

const setPlanets = (planets) => ({
  type: types.SET_PLANETS,
  payload: {
    planets,
  },
})

const setPlanetsError = (error) => ({
  type: types.SET_PLANETS_ERROR,
  payload: {
    error,
  },
})

const setCharactersCount = (totalCount) => ({
  type: types.SET_CHARACTERS_COUNT,
  payload: {
    totalCount,
  },
})

const setCurrentPage = (currentPage) => ({
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
