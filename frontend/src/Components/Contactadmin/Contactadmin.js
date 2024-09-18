import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contactadmin() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8izfn2n', 'template_na26ul4', form.current, {
        publicKey: 'Ga37k8TqCSPm6TpBm',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send the message, please try again');
        },
      );
  };
  return (
    <div>
      <h1>Contact Admin</h1>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label><br></br>
      <input type="text" name="user_name" /><br></br><br></br>
      <label>Email</label><br></br>
      <input type="email" name="user_email" /><br></br><br></br>
      <label>Message</label><br></br>
      <textarea name="message" /><br></br><br></br>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default Contactadmin
