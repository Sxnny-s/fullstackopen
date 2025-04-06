import React from "react";

const BlogForm = ({
  handleCreate,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleCreate({
      title,
      author,
      url,
    }); // Pass the input values to handleCreate
  };
  
  return (
    

    <div>
      <h1>Create new blog</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          data-testid='title'
          className="title"
          value={title}
          placeholder="title"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />

        <label htmlFor="author">Author</label>
        <input
          data-testid='author'
          className="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
          type="text"
          placeholder="Author"
        />

        <label htmlFor="url">Url</label>
        <input
          data-testid='url'
          className="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id="url"
          type="text"
          placeholder="URL"
        />

        <button data-testid='submit' className="button" type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
