/* eslint-disable no-unused-vars */
import React, { memo } from 'react'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import _map from 'lodash/map'
import cx from 'clsx'
import PropTypes from 'prop-types'

import { usePagination, DOTS } from '../hooks/usePagination'

interface IPagination {
  page: number
  setPage: (page: number) => void
  pageAmount: number
  total: number
}

const Pagination: React.FC<IPagination> = ({
  page, setPage, pageAmount, total,
}) => {
  const paginationRange = usePagination(total, page)

  return (
    <nav className='border-t-0 border-gray-200 px-4 flex items-center justify-between sm:px-0'>
      <div className='-mt-px w-0 flex-1 flex group'>
        {page > 1 && (
          <button
            type='button'
            onClick={() => setPage(page - 1)}
            className='pt-4 pr-1 inline-flex items-center text-sm font-medium dark:group-hover:text-gray-400 group-hover:text-gray-700 dark:text-gray-300 text-gray-500'
          >
            <ArrowLongLeftIcon className='mr-3 h-5 w-5 dark:group-hover:text-gray-400 group-hover:text-gray-700 dark:text-gray-300 text-gray-500 transition-none' aria-hidden='true' />
            Previous
          </button>
        )}
      </div>
      <div className='hidden md:-mt-px md:flex'>
        {
          _map(paginationRange, (item, index) => {
            if (item === DOTS) {
              return (
                <span className='border-transparent text-gray-500 dark:text-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium' key={item + index}>
                  {DOTS}
                </span>
              )
            }

            return (
              <button
                key={item}
                type='button'
                onClick={() => setPage(item)}
                className={cx({
                  'border-yellow-500 text-yellow-600 dark:text-yellow-400 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium': item === page,
                  'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium': item !== page,
                })}
              >
                {item}
              </button>
            )
          })
        }
      </div>
      <div className='-mt-px w-0 flex-1 flex justify-end group'>
        {page !== pageAmount && (
          <button
            type='button'
            onClick={() => setPage(page + 1)}
            className='pt-4 pl-1 inline-flex items-center text-sm font-medium dark:group-hover:text-gray-400 group-hover:text-gray-700 dark:text-gray-300 text-gray-500'
          >
            Next
            <ArrowLongRightIcon className='ml-3 h-5 w-5 dark:group-hover:text-gray-400 group-hover:text-gray-700 dark:text-gray-300 text-gray-500 transition-none' aria-hidden='true' />
          </button>
        )}
      </div>
    </nav>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  pageAmount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default memo(Pagination)
