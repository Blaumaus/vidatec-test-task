import React from 'react'
import { Helmet } from 'react-helmet-async'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

const Title = ({ title, children }) => {
  if (_isEmpty(title)) {
    return (
      <>
        <Helmet>
          <title>Star Wars</title>
        </Helmet>
        {children}
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

Title.defaultProps = {
  title: '',
}

export default Title
