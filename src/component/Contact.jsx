import React, { useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { useDarkMode } from '../context/dorkModeContext';

function Contact() {

  const { darkMode } = useDarkMode();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestions: '',
    message: ''
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      alert('Thank you for reaching out! We’ll respond to your message shortly.');
      // Reset form (optional)
      setFormData({
        name: '',
        email: '',
        suggestions: '',
        message: ''
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={`h-[80vh] grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'}`}>
      <div className='m-5 md:m-7 lg:m-10 p-5 md:p-7 lg:p-10 '>
        <p className='text-lg'>We'd Love to Hear From You!</p>
        <p className='text-sm w-3/4 mt-3'>Have questions, feedback, or need assistance? Reach out to us and we’ll get back to you as soon as possible!</p>
        <p className='w-3/4 mt-3'>You can also email us directly at <span className='text-blue-500'>email@example.com</span></p>
        <div className='flex gap-5 items-center'>
          <FaFacebook className='size-7 my-5' />
          <FaInstagramSquare className='size-7 my-5' />
          <FaTwitter className='size-7 my-5' />
        </div>
      </div>
      <div>
        <div className='border rounded-lg m-5 md:m-7 lg:m-10 p-5 md:p-7 lg:p-10'>
          <form className='flex flex-col justify-start gap-y-5' onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder='Name'
              className='form-control'
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder='email@example.com'
              className='form-control'
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              type="text"
              name="suggestions"
              placeholder='Suggestions'
              className='form-control'
              value={formData.suggestions}
              onChange={handleInputChange}
            />

            <textarea
              rows="3"
              name="message"
              placeholder='Message here'
              className='form-control'
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}

            <button
              type='submit'
              className='border rounded bg-blue-500 w-full text-white py-3 hover:scale-[1.01]'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
