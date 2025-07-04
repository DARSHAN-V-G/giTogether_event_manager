import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './StudentGroup.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, AlertTitle } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
  { field: 'roll_no', headerName: 'Roll No', flex: 1, minWidth: 80 },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 120 },
  { field: 'year', headerName: 'Year', flex: 1, minWidth: 60 }
];

const StudentGrouping = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/view`);
        const dataWithIds = response.data.map(student => ({
          ...student,
          id: student.roll_no,
          group_name: null
        }));
        setStudents(dataWithIds);
        setFilteredStudents(dataWithIds);
      } catch (err) {
        setError('Failed to fetch student data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchQuery, students]);

  const handleSelectionChange = (newSelection) => {
    setSelectedStudents(prevSelected => {
      const newSelectedSet = new Set([...prevSelected, ...newSelection]);
      return Array.from(newSelectedSet);
    });
  };

  const handleCreateGroup = () => {
    if (selectedStudents.length < 2 || selectedStudents.length > 3) {
      setError('Please select 2-3 students to create a group');
      return;
    }
    setIsDialogOpen(true);
  };

  const handleGroupNameSubmit = async () => {
    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }

    setIsLoading(true);
    try {
      const updatedStudents = students.map(student => {
        if (selectedStudents.includes(student.id)) {
          return { ...student, group_name: groupName };
        }
        return student;
      });

      const groupData = {
        teamName: groupName,
        members: selectedStudents.map(id => {
          const student = students.find(s => s.id === id);
          return {
            name: student.name,
            roll_no: student.roll_no,
            department: student.department,
            year: student.year,
            phn_no: student.phn_no
          };
        })
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/team/postteam`, groupData);

      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      setSuccessMessage(`Group "${groupName}" created successfully!`);
      setSelectedStudents([]);
      setGroupName('');
      setIsDialogOpen(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to create group. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isRowSelectable = (params) => !params.row.group_name;

  return (
    <div style={styles.container}>
      <p className="txt">
        Group Formation
      </p>

      <div style={isMobile ? styles.mobileHeader : styles.header}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
          sx={{
          width: '100%', // Full width for the TextField
          '& .MuiInputLabel-root': {
            color: '#d91656', // Label color
            '&.Mui-focused': {
              color: '#d91656', // Change label color when focused
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d91656', // Outline color
            },
            '&:hover fieldset': {
              borderColor: '#d91656', // Outline color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#d91656', // Outline color when focused
            },
          },
          '& .MuiInputBase-input': {
            color: 'white', // Input text color
          },
        }}
        />
        <Button
          variant="contained"
          onClick={handleCreateGroup}
          disabled={selectedStudents.length < 2 || selectedStudents.length > 3}
          style={isMobile ? styles.mobileButton : { marginLeft: '20px' }}
        >
          Create Group
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

      <Paper sx={{ height: 700, width:`${isMobile?'80%':'60%'}`, overflowX: 'auto' }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          pageSize={isMobile ? 5: 10}
          checkboxSelection
          isRowSelectable={isRowSelectable}
          onRowSelectionModelChange={handleSelectionChange}
          selectionModel={selectedStudents}
          sx={{
            border: 0,
            '& .grouped-row': {
              backgroundColor: '#f0f7ff',
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.8rem',
            }
          }}
          getRowClassName={(params) =>
            params.row.group_name ? 'grouped-row' : ''
          }
        />
      </Paper>

      <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      maxWidth="md" // Set the maximum width of the dialog
      fullWidth // Ensure the dialog takes up the full width
    >
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Group Name"
          type="text"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div style={{ marginTop: '10px' }}>
          <strong>Selected Students:</strong>
          <ul>
            {selectedStudents.map(id => {
              const student = students.find(s => s.id === id);
              return <li key={id}>{student?.name} ({student?.roll_no})</li>;
            })}
          </ul>
        </div>
      </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleGroupNameSubmit}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Group'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  mobileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  mobileButton: {
    width: '100%',
  }
};

export default StudentGrouping;
