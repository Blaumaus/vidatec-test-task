/* eslint-disable implicit-arrow-linebreak, no-unused-vars */
import axios from 'axios'
import Debug from 'debug'

const debug = Debug('sw-test-task:api')
const baseURL = process.env.REACT_APP_API_URL

// Using axios.create() to create a new instance of axios with a custom config
// (i.e. I set baseURL here, but potentially things like authorisation tokens might be set via
// the request/response interceptors)
const api = axios.create({
  baseURL,
})

export const getCharacters: (page: number) => Promise<any> = (page) =>
  api
    .get(`people/?page=${page}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw error.response.data
    })

export const getPlanet: (id: number) => Promise<any> = (id) =>
  api
    .get(`planets/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw error.response.data
    })

export const getPlanets = () =>
  api
    .get('planets')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw error.response.data
    })

export const customRequest: (url: string, method: string, data?: any) => Promise<any> = (url, method, data) =>
  axios[method](url, data)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw error.response.data
    })
