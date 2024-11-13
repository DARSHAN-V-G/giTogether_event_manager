const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
let supabase;
try {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log("Connected to Supabase");
} catch (err) {
  console.error("Error connecting to Supabase:", err);
}


module.exports = supabase;
