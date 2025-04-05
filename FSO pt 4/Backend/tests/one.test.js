// const listHelper = require('../utils/list_helpers');

// describe('most published blogs', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 6,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 90,
//       __v: 0
//     },

//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.mostBlogs(listWithOneBlog)
//     console.log(result)
//     expect(result).toEqual({
//       author: "Edsger W. Dijkstra",
//       blogs: 3
//     })
//   })
// })


// describe('most liked author', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Jimmy',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 16,
//       __v: 0
//     }
//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.mostLiked(listWithOneBlog)  
//     expect(result).toEqual({
//         author: "Edsger W. Dijkstra",
//         likes: 17
//     })
//   })
// })




// describe('total likes', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)  
//     expect(result).toBe(5)
//   })
// })

// describe('total likes', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)  
//     expect(result).toBe(5)
//   })
// })

// describe('most liked blog', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 6,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',  
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 90,
//       __v: 0
//     },

//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.favoriteBlog(listWithOneBlog)  
//     expect(result).toEqual({
//       title: "Canonical string reduction",  
//       author: "Edsger W. Dijkstra",
//       likes: 90
//     })
//   })
// })

