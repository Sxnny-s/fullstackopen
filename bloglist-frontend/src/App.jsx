import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogCreationStatus, setBlogCreationStatus] = useState(null)
  const [formVisible, setFormVisible] = useState(true)

  const visiblity = { display: formVisible ? 'none' : '' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [])
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  // Function to update likes in real-time
  const updateBlogLikes = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes) // Sort by likes
    );
  };
  

  const updateBlogList = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id != id ))
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      
    } catch (error){
      
      setErrorMessage('Wrong Credentials')
      
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  
  const handleCreate = async (e) => {
    e.preventDefault()
    console.log('adding new note to DB')
    try {
      
      const newObject = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      
      
      
      const blogObject = await blogService.create(newObject)
      
      console.log(blogObject)
      
      const newblog = blogs.concat(blogObject)
      setBlogs(newblog)
      
      setTitle('')
      setAuthor('')
      setUrl('')
      
      setFormVisible(true)
      
      setBlogCreationStatus(`a new blog ${blogObject.title} by ${blogObject.author} was added`)
      
      setTimeout(() => {
        setBlogCreationStatus(null)
      },3000)
      
    } catch (error) {
      setErrorMessage('Blog was not addded to database')
      
      setTimeout(() =>{
        setErrorMessage(null)
      },3000)
    }
    
  }
  
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} >
          <label htmlFor="Username">Username</label>
          <input id='Username' placeholder='username' onChange={({ target }) => setUsername(target.value) }/> 

          <label htmlFor="Password">password</label>
          <input id='Password' placeholder='Password' onChange={({ target }) => setPassword(target.value)}/>
          <button type='submit'>login</button>
        </form>
        <div style={{color: 'red'}}>{errorMessage}</div>
      </div>
    )
  }
  
  
  
  
  return (
    <div>

      <h2>blogs</h2>
      <button onClick={handleLogout} >Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  updateBlogLikes={updateBlogLikes} updateBlogList={updateBlogList} curUser={user}/>
      )}

      <div>
        <button onClick={() => setFormVisible(!formVisible)} >create new blog</button>
      </div>

      
      <div style={visiblity}>
        <h1>Create new blog</h1>
        <form onSubmit={handleCreate}>
      
          <label htmlFor="title">Title</label>
          <input value={title} placeholder='title' type="text" onChange={({target}) => setTitle(target.value)} />

          <label htmlFor="author">Author</label>
          <input value={author} onChange={({ target }) => setAuthor(target.value)} id='author' type="text" placeholder='Author' />

          <label htmlFor="url">Url</label>
          <input value={url} onChange={({ target }) => setUrl(target.value)} id='url' type="text" placeholder='URL' />

          <button  type='submit'>Create</button>
        </form>
      </div>


      <div style={{color: 'green'}}>{blogCreationStatus}</div>
      <div style={{color: 'red'}}>{errorMessage}</div>
    </div>
  )
}





export default App