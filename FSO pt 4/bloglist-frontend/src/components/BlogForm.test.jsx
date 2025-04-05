/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'
import { useState } from 'react'




vi.mock('../services/blogs', () => ({
    default: {
        create: vi.fn()
    }
}))



test('new blog has correct details', async () => {

    const mockHandler = vi.fn()
    const blogService = (await import('../services/blogs')).default;

    blogService.create.mockResolvedValue({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://example.com',
        likes: 10,
        user: { username: 'testuser' },
    })


    const TestWrapper = () => {
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [url, setUrl] = useState('');
    
        return (
          <BlogForm
            handleCreate={mockHandler}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        );
      };
    
      const { container } = render(<TestWrapper />);
    



    const submit = container.querySelector('.button')
    const user = userEvent.setup()
    const titleInput = container.querySelector('.title')
    const titleAuthor = container.querySelector('.author')
    const titleUrl = container.querySelector('.url')


    await user.type(titleInput, 'Test Blog Title')
    await user.type(titleAuthor, 'Test Author')
    await user.type(titleUrl, 'http://example.com')

    await user.click(submit)

    console.log('TEST',mockHandler.mock.calls)

    expect(mockHandler).toHaveBeenCalledTimes(1);

    expect(mockHandler).toHaveBeenCalledWith({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://example.com',
      });

  })