const {test, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict'); 

const api = supertest(app)

test('blogs are returned as json' , async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
} )

test('there are 0 notes', async () => {
    const res = await api.get('/api/blogs')
    
    assert.strictEqual(res.body.length,0)
})

test('all id not _id', async () => {
    const res = await api.get('/api/blogs')
    const body = res.body
    assert(body.every((e) => e.id && !e._id))
})

test('add to database', async () => {
    const newBlog = {
    "title": "Understanding Express Routers",
    "author": "John Doe",
    "url": "https://example.com/express-routers",
    "likes": 25,
    }

    const blogs = await api.get('/api/blogs')
    const orginalLength = blogs.body.length 

    await api.post(`/api/blogs`)
        .send(newBlog)
        .expect(201)

    const res = await api.get('/api/blogs')
    const body = res.body

    assert(body.length, orginalLength + 1)
})

test('no like property', async () => {
    const newBlog = {
        "title": "Understanding Express Routers",
        "author": "John Doe",
        "url": "https://example.com/express-routers",
        }


    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

})

test('no title or url', async () => {
    const newBlog = {    
        "author": "John Doe"
        }


    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

})


test('delete api test', async () => {
   
    const res = await api.get('/api/blogs')
    const ID = res.body[0].id

    await api.delete(`/api/blogs/${ID}`)
        .expect(201)

})

test.only('update likes ', async () => {
   
    const res = await api.get('/api/blogs')
    const ID = res.body[0].id
    const orginalLikes = res.body[0].likes

    const updatedlikes = await api.patch(`/api/blogs/${ID}`)
        .expect(200)

    assert.strictEqual(updatedlikes.body.likes, orginalLikes + 1 )

})

after(async () => {
    await mongoose.connection.close()
})

