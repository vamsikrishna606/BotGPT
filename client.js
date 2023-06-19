const axios = require('axios');

const zoomApiKey = 'GmEeNXYzRfm2QMk56DyH2Q';
const zoomApiSecret = '1VAYBf6WN9UAv7E0ubB1sZw5mi8SAEJg';

const joinZoomMeeting = async (meetingLink) => {
  try {
    const authToken = Buffer.from(`${zoomApiKey}:${zoomApiSecret}`).toString('base64');

    const response = await axios.post(
      `${meetingLink}/join`,
      {
        name: 'Bot',
      },
      {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'json'
        }
      }
    );

    console.log('Successfully joined the meeting:', response.data);
  } catch (error) {
    console.error('Failed to join the meeting:', error);
  }
};

module.exports = joinZoomMeeting;
