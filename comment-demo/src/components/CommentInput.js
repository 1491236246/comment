import React, { Component } from 'react'
import {addComment} from '../store/action'
import {connect} from 'react-redux'

class CommentInput extends Component {

  constructor () {
    super()
    this.state = {
      username: '',
      content: '',
    }
  }

  componentDidMount () {
    this.textarea.focus()
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleUsernameBlur = (event) => {
    this._saveUsername(event.target.value)
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit = () => {
    if (!this.state.username) { alert('请输入用户名'); return}
    if (!this.state.content) {alert('请输入评论内容'); return}
    this.props.AddComment({...this.state,createdTime:new Date().getTime()});
    this.setState({ content: '' },()=>{
      localStorage.setItem('comments', JSON.stringify(this.props.comments))
    })
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur}
              onChange={this.handleUsernameChange} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments:state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddComment: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentInput)