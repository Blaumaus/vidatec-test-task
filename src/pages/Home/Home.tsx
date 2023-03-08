/* eslint-disable no-alert, no-unused-vars */
import React, { memo, useMemo, useState } from 'react'
import _map from 'lodash/map'
import _ceil from 'lodash/ceil'
import _find from 'lodash/find'
import _orderBy from 'lodash/orderBy'
import _uniq from 'lodash/uniq'
import _pickBy from 'lodash/pickBy'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import _replace from 'lodash/replace'

import Title from '../../components/Title'
import Pagination from '../../ui/Pagination'
import Select from '../../ui/Select'
import Loader from '../../ui/Loader'

import { CHARACTERS_PER_PAGE } from '../../redux/constants'
import { ICharacter, IPlanet } from '../../redux/adapters/ui'

interface IOrderOption {
  label: string
  value: string
}

const ORDER_OPTIONS: IOrderOption[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
  { label: 'Default', value: 'default' },
]

const DEFAULT_ORDER = 'default'
const DEFAULT_PLANET = 'All planets'

const UNKNOWN_VALUES = ['unknown', 'n/a', 'none']

const getCharDetailsString = (char: ICharacter) => {
  let result = char.name

  if (!_includes(UNKNOWN_VALUES, char.gender)) {
    result += ` is a ${char.gender}`
  }

  if (!_includes(UNKNOWN_VALUES, char.height)) {
    result += ` is ${char.height}cm tall,`
  }

  if (!_includes(UNKNOWN_VALUES, char.mass)) {
    result += ` weighs ${char.mass}kg,`
  }

  if (!_includes(UNKNOWN_VALUES, char.hair_color)) {
    result += ` has ${char.hair_color} hair,`
  }

  if (!_includes(UNKNOWN_VALUES, char.eye_color)) {
    result += ` has ${char.eye_color} eyes,`
  }

  // Replacing the trailing comma with a dot
  result = _replace(result, /,$/, '.')

  return result
}

// create interface for Home props

interface IHomeProps {
  characters: ICharacter[]
  planets: IPlanet[]
  setCurrentPage: (page: number) => void
  currentPage: number
  totalCount: number
  isLoading: boolean
}

const Home: React.FC<IHomeProps> = ({
  characters, planets, setCurrentPage, currentPage, totalCount, isLoading,
}) => {
  const [order, setOrder] = useState<IOrderOption>(
    _find(ORDER_OPTIONS, (item) => item.value === DEFAULT_ORDER)!,
  )
  const [planet, setPlanet] = useState(DEFAULT_PLANET)

  const processedCharacters = useMemo(() => {
    let currentCharacters = characters[currentPage]

    if (planet !== DEFAULT_PLANET) {
      const planetURL: string = _find(planets, (item) => item.name === planet)?.url || ''
      // @ts-ignore
      currentCharacters = _pickBy(currentCharacters, (char: ICharacter) => char.homeworld === planetURL)
    }

    if (order?.value === 'default') {
      return currentCharacters
    }

    // @ts-ignore
    return _orderBy(currentCharacters, ['name'], [order.value])
  }, [characters, currentPage, planets, order, planet])

  const availablePlanets = useMemo(() => {
    // @ts-ignore
    const currentCharacters: ICharacter[] = characters[currentPage]
    const charPlantes = _uniq(_map(currentCharacters, 'homeworld'))

    // Excluding undefined as some planets might still be loading
    return _filter([{ name: DEFAULT_PLANET }, ..._map(charPlantes, (aPlanet) => planets[aPlanet])], (item) => item)
  }, [planets, characters, currentPage])

  const pageAmount = useMemo(() => _ceil(totalCount / CHARACTERS_PER_PAGE), [totalCount])

  const _setOrder = (label: string) => {
    const newOrder = _find(ORDER_OPTIONS, (item) => item.label === label)!
    setOrder(newOrder)
  }

  return (
    <Title title='Home page'>
      <div className='px-5 py-2 bg-gray-800 min-h-page'>
        <h1 className='text-3xl font-bold text-gray-50 mb-5 text-center'>
          Star Wars Characters
        </h1>
        <div className='max-w-xl mx-auto mb-5'>
          <Select
            label='Order'
            items={ORDER_OPTIONS}
            labelExtractor={(item: IOrderOption) => item.label}
            keyExtractor={(item: IOrderOption) => item.value}
            onSelect={_setOrder}
            title={order.label}
          />
          <Select
            label='Planet'
            items={availablePlanets}
            labelExtractor={(item: IPlanet) => item.name}
            keyExtractor={(item: IPlanet) => item.url}
            onSelect={setPlanet}
            title={planet}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {_map(processedCharacters, (char: ICharacter) => (
              <div
                key={char.name}
                className='flex gap-5 relative bg-gray-750 py-5 px-4 sm:py-6 sm:px-6 shadow rounded-lg border-gray-750 border-2 hover:border-yellow-500'
              >
                {/* Image placeholder */}
                <div className='h-32 w-32 bg-gray-600 rounded-md' />
                <div>
                  <p className='text-gray-300 text-sm font-medium uppercase tracking-wide'>
                    Name:
                    {' '}
                    {char.name}
                  </p>
                  <p className='text-gray-300 mt-1 text-sm font-medium uppercase tracking-wide'>
                    Gender:
                    {' '}
                    {char.gender}
                  </p>
                  <p className='text-gray-300 mt-1 text-sm font-medium uppercase tracking-wide'>
                    Planet:
                    {' '}
                    {planets[char.homeworld]?.name || 'Loading...'}
                  </p>
                  <div
                    className='text-gray-300 mt-1 italic cursor-pointer hover:text-gray-200'
                    aria-label='Get more details about this character (popup will be shown)'
                    onClick={() => alert(getCharDetailsString(char))}
                  >
                    Details...
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Pagination
          page={currentPage}
          setPage={setCurrentPage}
          pageAmount={pageAmount}
          total={totalCount}
        />
      </div>
    </Title>
  )
}

export default memo(Home)
