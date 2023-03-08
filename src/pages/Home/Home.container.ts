import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import Home from './Home'

const mapStateToProps = (state) => ({
  characters: state.ui.characters.characters,
  planets: state.ui.planets.planets,
  totalCount: state.ui.characters.totalCount,
  currentPage: state.ui.characters.currentPage,
  isLoading: state.ui.characters.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (currentPage) => dispatch(UIActions.setCurrentPage(currentPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
