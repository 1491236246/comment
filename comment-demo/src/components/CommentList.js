import React, { Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initComments,deleteComment} from '../store/action'


class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  handleDeleteComment = (index) => {
      this.props.onDeleteComment(index);
      let nowComments = [...this.props.comments]
      nowComments = [
        ...nowComments.slice(0, index),
        ...nowComments.slice(index + 1)
      ]
      localStorage.setItem('comments', JSON.stringify(nowComments))
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments:state.comments
  }
}

const mapDispathcToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

export default connect(mapStateToProps,mapDispathcToProps)(CommentList)