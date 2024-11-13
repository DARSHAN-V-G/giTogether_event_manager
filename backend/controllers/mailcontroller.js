const { Resend } = require('resend');
const Team = require('../models/Team'); // Assuming Team model is in the models folder
require('dotenv').config();

const emailhandler = new Resend(process.env.RESEND_API);

const postData = async (req, res) => {
  try {
    // Fetch all teams from MongoDB
    const teams = await Team.find({});

    if (!teams || teams.length === 0) {
      return res.status(404).json({ error: 'No teams found' });
    }

    // Loop through each team and send email to the first member
    const emailPromises = teams.map(async (team) => {
      if (team.members && team.members.length > 0) {
        const firstMember = team.members[0];
        const recipientEmail = `${firstMember.roll_no.toLowerCase()}@psgtech.ac.in`;
        
        const mailOptions = {
          from: process.env.EMAIL_ID, // Sender's email
          to: recipientEmail,
          subject: 'GiTogether Registration Confirmation',
          html: `<!doctype html>
            <html lang="en">
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>GiTogether Registration Confirmation</title>
                <style>/* Your email styles here */</style>
              </head>
              <body>
                <p>Hey 👋 ${firstMember.name},</p>
                <p>Thank you for registering!</p>
              </body>
            </html>`
        };

        // Send the email and return the promise
        return sendConfirmationEmail(mailOptions);
      }
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.status(200).json({ message: 'Emails sent successfully to all teams' });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

// Function to send a confirmation email
const sendConfirmationEmail = async (mailOptions) => {
  try {
    await emailhandler.emails.send(mailOptions);
    console.log(`Confirmation email sent to ${mailOptions.to}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};

module.exports = {
  postData
};
