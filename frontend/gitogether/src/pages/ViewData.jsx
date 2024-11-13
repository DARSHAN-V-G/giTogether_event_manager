import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'roll_no', headerName: 'Roll No', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phn_no', headerName: 'Phone', width: 130 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'year', headerName: 'Year', width: 90 },
];

const paginationModel = { page: 0, pageSize: 5 };

const Database = () => {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [postedRows, setPostedRows] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/view`);
        const dataWithIds = response.data.map(row => ({
          ...row,
          id: row.roll_no // Using roll_no as the unique identifier
        }));
        setEventData(dataWithIds);
        setError(null);
      } catch (err) {
        setError('Failed to fetch event data. Please try again.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleAddClick = async () => {
    if (selectedRows.length === 0) {
      setError('Please select at least one record to add.');
      return;
    }

    setIsLoading(true);
    try {
      // Get the selected records data using roll_no
      const selectedData = selectedRows.map(rollNo => {
        const record = eventData.find(row => row.roll_no === rollNo);
        // Return the data in the required format
        return {
          name: record.name,
          roll_no: record.roll_no,
          department: record.department,
          email: record.email,
          phn_no: record.phn_no,
          year: record.year
        };
      });

      console.log('Selected Data:', selectedData);
      
      // Make the POST request
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/event/postdata`, selectedData);

      // Add successfully posted rows to the set
      const newPostedRows = new Set(postedRows);
      selectedRows.forEach(rollNo => newPostedRows.add(rollNo));
      setPostedRows(newPostedRows);

      // Clear selection and show success message
      setSelectedRows([]);
      setSuccessMessage('Selected records have been successfully added!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to post selected records. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = eventData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Customize row selection based on whether it's already been posted
  const isRowSelectable = (params) => !postedRows.has(params.row.roll_no);

  return (
    <div style={styles.container}>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-lg w-64"
        />
        <Button 
          variant="contained"
          onClick={handleAddClick}
          disabled={isLoading || selectedRows.length === 0}
          style={{ marginLeft: '16px' }}
        >
          {isLoading ? 'Adding...' : 'Add Selected'}
        </Button>
      </div>

      {error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" style={{ marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      <h3 style={styles.subHeader}>Event Data</h3>
      
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          isRowSelectable={isRowSelectable}
          onRowSelectionModelChange={handleSelectionChange}
          selectionModel={selectedRows}
          sx={{ 
            border: 0,
            '& .posted-row': {
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#eeeeee',
              },
            },
          }}
          getRowClassName={(params) => 
            postedRows.has(params.row.roll_no) ? 'posted-row' : ''
          }
        />
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  subHeader: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: '10px 0',
  },
};

export default Database;