import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLikes, updateBlogList,curUser }) => {

  console.log(blog.user.username, curUser.username)
  const [visible, setVisible] = useState(true)
  const [likes, setLikes] = useState(blog.likes)
  
  const visiblity = { display: visible ? 'none' : '' }

  const text = visible ? 'view' : 'hide'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async (id) => {
    const res = await blogService.remove(id)
    console.log(res)
    updateBlogList(id)
    return res

  }
  
 const handleClick = () => {
    setVisible(!visible)
 }
 
 const handleLike = async (id) => {
    const like = await blogService.incrementLike(id)
    setLikes(like.likes)
    updateBlogLikes(like)
    console.log(like)
 }

  return (
    <div style={blogStyle}>  <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>{text}</button>
      </div>
      <div style={visiblity} >
        <p>Title: {blog.title}</p>
        <p>URL: {blog.url}</p>
        <p>likes: {likes} <button onClick={() => handleLike(blog.id)}>like</button></p> 
        <p>Author: {blog.author}</p>
        <p>Post Creator: {blog.user.username}</p>

        {blog.user.username === curUser.username && (<button onClick={() => handleDelete(blog.id)}>Delete</button>)}


      </div>
  </div>
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  updateBlogList: PropTypes.func.isRequired,
  curUser: PropTypes.object.isRequired,
}




export default Blog