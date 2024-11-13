import React from 'react';

const Mail = () => {
  // Function to handle the email sending
  const sendEmailsToAllTeams = async () => {
    try {
      const response = await fetch('http://localhost:5000/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      // Display a success message
      alert(data.message);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails');
    }
  };

  return (
    <div>
      <button onClick={sendEmailsToAllTeams}>Send Emails to All Teams</button>
    </div>
  );
};

export default Mail;
