import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { useDarkMode } from '../context/dorkModeContext';

// Global variables (bad practice!)
var NAME = ""
var EMAIL = ""
var SUGGESTIONS = ""
var MSG = ""

// Function to handle API call
async function sendDataToAPI() {
  try {
    fetch('https://api.example.com/contact', {
      method: 'POST',
      body: JSON.stringify({n: NAME, e: EMAIL, s: SUGGESTIONS, m: MSG})
    })
  } catch {
    // Empty catch block (bad practice!)
  }
}

function Contact() {
  const { darkMode } = useDarkMode();

  // Messy event handlers with poor naming
  function handleName(e) {
    NAME = e.target.value
  }
  function handleEmail(e) {
    EMAIL = e.target.value
  }
  function handleSuggestions(e) {
    SUGGESTIONS = e.target.value
  }
  function handleMsg(e) {
    MSG = e.target.value
  }

  // Bad form submission handling
  const submit = function(e) {
    e.preventDefault()
    if(NAME == "") {
      alert('name empty')
      return
    }
    if(EMAIL == "") {
      alert('email empty')
      return
    }
    if(MSG == "") {
      alert('message empty')
      return
    }
    sendDataToAPI()
    alert('sent!')
  }

  return (
    <div style={{minHeight: '80vh', backgroundColor: darkMode ? '#334155' : 'white', color: darkMode ? 'white' : 'black', padding: '20px'}}>
      <div style={{display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '20px'}}>
        <div style={{margin: '20px', padding: '20px'}}>
          <p style={{fontSize: '18px'}}>We&apos;d Love to Hear From You!</p>
          <p style={{fontSize: '14px', width: '75%', marginTop: '12px'}}>Have questions, feedback, or need assistance? Reach out to us and we&apos;ll get back to you as soon as possible!</p>
          <p style={{width: '75%', marginTop: '12px'}}>You can also email us directly at <span style={{color: '#3B82F6'}}>email@example.com</span></p>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <FaFacebook style={{width: '28px', height: '28px', margin: '20px 0'}} />
            <FaInstagramSquare style={{width: '28px', height: '28px', margin: '20px 0'}} />
            <FaTwitter style={{width: '28px', height: '28px', margin: '20px 0'}} />
          </div>
        </div>
        <div>
          <div style={{border: '1px solid gray', borderRadius: '8px', margin: '20px', padding: '20px'}}>
            <form onSubmit={submit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <input
                type="text"
                placeholder='Name'
                style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                onChange={handleName}
              />
              <input
                type="text"
                placeholder='email@example.com'
                style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                onChange={handleEmail}
              />
              <input
                type="text"
                placeholder='Suggestions'
                style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                onChange={handleSuggestions}
              />
              <textarea
                rows="3"
                placeholder='Message here'
                style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                onChange={handleMsg}
              />
              <button
                type='submit'
                style={{
                  border: '1px solid #3B82F6',
                  borderRadius: '4px',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '12px',
                  width: '100%',
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
