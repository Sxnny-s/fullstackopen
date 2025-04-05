/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLikes, updateBlogList, curUser }) => {

  const [visible, setVisible] = useState(true)
  const [likes, setLikes] = useState(blog.likes)
  const [username, setUserName] = useState(curUser.username)

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

    // const updatedBlog = { ...blog, likes: likes + 1 };
    // setLikes(updatedBlog.likes); 
    // updateBlogLikes(updatedBlog); 
    
 }

  return (
        <div style={blogStyle}>  

        <div className="preview">

          {blog.title} {blog.author}

        <button className="button" onClick={handleClick}>{text}</button>


        </div>

      <div className="hidden" style={visiblity} >
        <p>Title: {blog.title}</p>
        <p>URL: {blog.url}</p>
        <p>likes: {likes} <button className="likeBtn" onClick={() => handleLike(blog.id)}>like</button></p> 
        <p>Author: {blog.author}</p>
        <p>Post Creator: {username}</p>

        {blog.user.username === curUser.username && (<button onClick={() => handleDelete(blog.id)}>Delete</button>)}

      </div>
  </div>
)}


// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string,
//     author: PropTypes.string,
//     url: PropTypes.string,
//     likes: PropTypes.number,
//     user: PropTypes.shape({
//       username: PropTypes.string,
//     }),
//   }),
//   updateBlogLikes: PropTypes.func,
//   updateBlogList: PropTypes.func,
//   curUser: PropTypes.shape({
//     username: PropTypes.string,
//   }),
// };

export default Blog

