import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FileInput } from 'flowbite-react';
import { Tech_Select } from '../Blog_ui/blog_select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import {  Toaster } from 'sonner'; // Ensure correct import
import {  AlertE, AlertS } from '../Blog_ui/alert_modal';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  
  const handleChange = (value: string) => {
    setContent(value);
  };

  const HandleUploadEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8787/api/v1/blog', {
        title: title,
        content: content,
        userId: '1611debf-ac0f-4fa9-a144-3ddd26a43886',
        category: category,
      });

      if (response.status !== 200) {
        AlertE({ title: 'Error', description: 'Try Again, Post is not Posted', label: 'Close' });
      } else {
        AlertS({ title: 'Success', description: 'Post is Uploaded Successfully', label: 'Close' });
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      AlertE({ title: 'Error', description: 'Try Again, Post is not Uploaded', label: 'Close' });
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <Toaster richColors/> 
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={HandleUploadEvent}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            id="title"
            required
            className="flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Tech_Select onChange={(e) => setCategory(e)} />
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-gray-100 p-3 border-dotted shadow-inner">
          <FileInput
            typeof="file"
            accept="image/*"
            className="font-thin p-2 bg-gray-100 dark:bg-gray-900 ring-1 ring-black"
          />
          <Button variant={"default"}>Upload</Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write your story and share with the world"
          className="md:h-80 h-20 mb-12 dark:bg-gray-300 "
          value={content}
          onChange={handleChange}
        />
        <Button type="submit" variant={"default"} className="shadow-md dark:shadow-gray-400 dark:shadow-sm">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
