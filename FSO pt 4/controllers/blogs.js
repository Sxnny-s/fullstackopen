const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if(!blog.title || !blog.url){
      return response.status(400).json({ error: 'Title and URL are required' })
    }

    if(blog.likes === undefined){
      blog.likes = 0
    }

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })


  blogRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    await Blog.findByIdAndDelete(`${ID}`)

    response.status(201).json({message: 'blog has been deleted'})
    
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