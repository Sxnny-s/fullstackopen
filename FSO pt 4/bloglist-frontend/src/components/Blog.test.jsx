/* eslint-disable semi */
/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


vi.mock('../services/blogs', () => ({
  default: {
    incrementLike: vi.fn(), // Mock the incrementLike function
  },
}));


test('renders title and author', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const curUser = { username: 'testuser' };

  const { container } = render(<Blog blog={blog} curUser={curUser}/>)

  const div = screen.getByText('Test Blog Title Test Author')
  expect(div).toBeInTheDocument()

  const hiddenDiv = container.querySelector('.hidden')

  expect(hiddenDiv).toHaveStyle('display: none')

})

test('shows url and likes after click', async () => {

  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const curUser = { username: 'testuser' };


  const { container } = render(<Blog blog={blog} curUser={curUser} />)

  const user = userEvent.setup()
  const button = container.querySelector('.button')

  const hiddenDiv = container.querySelector('.hidden')

  expect(hiddenDiv).toHaveStyle('display: none')

  await user.click(button)

  expect(hiddenDiv).toHaveStyle('display: block')

})

test('like button is clicked twice', async () => {

  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const curUser = { username: 'testuser' };

  const mockHandler = vi.fn()

  // Mock the incrementLike function to return updated likes
  const blogService = (await import('../services/blogs')).default;

  blogService.incrementLike.mockResolvedValue({ likes: 11 });

  const { container } = render(<Blog blog={blog} curUser={curUser} updateBlogLikes={mockHandler} />)

  const user = userEvent.setup()

  const button = container.querySelector('.button')
  screen.debug(button)

  const likeButton = container.querySelector('.likeBtn')

  await user.click(button)

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)

})


