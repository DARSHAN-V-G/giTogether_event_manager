import React from 'react';

const Mail = () => {
  // Function to handle the email sending
  const sendEmailsToAllTeams = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mail/send`, {
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
