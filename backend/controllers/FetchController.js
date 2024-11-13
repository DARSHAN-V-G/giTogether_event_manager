const supabase = require('../config/db_connect.js');

const fetchData = async (req, res) => {
  try {
    const { data, error } = await supabase.from('gitogether').select('*');

    if (error) {
      return res.status(500).json({ message: 'Error fetching event data' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching event data:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

const postData = async (req, res) => {
  try {
    const records = req.body;

    // Insert each record into the "attended" table
    const { data, error } = await supabase
      .from('attended')
      .insert(records);

    if (error) {
      console.error('Error inserting records:', error);
      return res.status(500).json({ error: 'Failed to insert records' });
    }

    res.status(200).json({ message: 'Records added successfully', data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
module.exports = {
    fetchData,
    postData
};