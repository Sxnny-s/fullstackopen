const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



blogRouter.get('/', async (request, response) => {

    Blog
      .find({})
      .populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })

  
  blogRouter.post('/', async (request, response) => {
    try {
        const token = request.token

        if (!token) {
            return response.status(401).json({ error: 'Token missing' })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(401).json({ error: 'User not found' })
        }

        const { title, author, url, likes = 0 } = request.body

        if (!title || !url) {
            return response.status(400).json({ error: 'Title and URL are required' })
        }

        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        const populatedBlog = await Blog.findById(savedBlog._id).populate('user')

        response.status(201).json(populatedBlog)

    } catch (error) {
        console.error('Error:', error)
        response.status(500).json({ error: 'Something went wrong' })
    }
})


  

  blogRouter.delete('/:id', async (request, response) => {
    
    const ID = request.params.id

    const token = request.token

    if (!token) {
      return response.status(401).json({ error: 'Token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    const CurrentUser = decodedToken.id

    const blog = await Blog.findById(ID)
    console.log("BLOG",blog)

    const blogOwner = blog.user
    

    if(CurrentUser.toString() != blogOwner.toString()){
      return response.status(400).json({error: 'User not autherized to delete this blog'})
    }

    await Blog.findByIdAndDelete(`${ID}`)

    response.status(200).json({message: 'blog has been deleted'})
    
  })



  blogRouter.patch('/:id', async (request, response) => {
    const ID = request.params.id

    const updatedLikes = await Blog.findByIdAndUpdate(ID, 
      {$inc: {likes: 1}},
      {new: true})


    if(!updatedLikes){
      return response.status(404).json({error: 'Blog not found'})
    }

    return response.status(200).json(updatedLikes)

  })



 module.exports = blogRouter