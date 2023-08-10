import React, { useRef, useState, useEffect } from 'react';
import { createPost } from './api';

const EditableTextField = ({ initialTitle = '', initialContent = '', postId}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const titleFieldRef = useRef();
  const contentFieldRef = useRef();

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSaveClick = () => {
    // Create the post object
    const newPostData = {
      title: title,
      content: content
    };
    setTitle(title)
    setContent(content)
    console.log(newPostData);
    // Call the createPost function with the post object
    createPost(newPostData,postId);
  };

  const handleContentChange = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(contentFieldRef.current);
    range.collapse(false); // Collapse to the end of the range (end of the content)
    selection.removeAllRanges();
    selection.addRange(range);
  
    setContent(contentFieldRef.current.innerText);
  };
  

  const handleTitleChange = () => {
    setTitle(titleFieldRef.current.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/*
      <div>
        <strong>title:</strong> {title}
      </div>
      <div>
        <strong>Post:</strong> {content}
      </div>
      */}
      <div>
        <strong>Title:</strong>{' '}
        <input
          type="text"
          ref={titleFieldRef}
          value={title}
          onChange={handleTitleChange}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <div
        contentEditable
        ref={contentFieldRef}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '4px',
          minHeight: '50px',
        }}
        onInput={handleContentChange}
      >
        {content}
      </div>
      <button onClick={handleSaveClick} style={{ marginTop: '10px' }}>
        Save
      </button>
      
    </div>
  );
};

export default EditableTextField;