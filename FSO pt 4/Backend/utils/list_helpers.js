// utils/list_helper.js
const dummy = (blogs) => {
  return 1;  // This is what the dummy function does: it always returns 1
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  let max = 0
  blogs.forEach(e => {
    max = Math.max(e.likes,max)
  })

  let ans 
  blogs.forEach(e => {
    if(e.likes === max){
      ans = e
    }
  })

  return {
    title: ans.title,
    author: ans.author,
    likes: ans.likes
  }
}

const mostBlogs = (blogs) => {
  let map = {}
  let max = 0
  for(let i = 0; i < blogs.length; i++){
    map[blogs[i].author] = (map[blogs[i].author] || 0) + 1
    max = Math.max(max,  map[blogs[i].author])
  }

  for(key in map){
    if(map[key] == max){
      return {
        author: key,
        blogs: max
      }
    }
  }
}
const mostLiked = (blogs) => {
  let map = {}
  let max = 0
  for(let i = 0; i < blogs.length; i++){
    map[blogs[i].author] = (map[blogs[i].author] || 0) + blogs[i].likes
    max = Math.max(max,  map[blogs[i].author])
  }

  for(key in map){
    if(map[key] == max){

      return {
        author: key,
        likes: max
      }

    }
  }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLiked };
