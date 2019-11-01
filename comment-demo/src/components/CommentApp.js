import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initComments} from '../store/action'


class CommentApp extends Component {

  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
  }

  componentDidMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.props.initComments(comments)
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput/>
        <CommentList/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispathcToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments))
    }
  }
}

export default connect(mapStateToProps,mapDispathcToProps)(CommentApp)