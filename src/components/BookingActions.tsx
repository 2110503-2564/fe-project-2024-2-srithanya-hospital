'use client';

import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface BookingActionsProps {
  bookingId: string;
  token: string;
}

export default function BookingActions({ bookingId, token }: BookingActionsProps) {
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newMembers, setNewMembers] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewDate('');
    setNewMembers(1);
  };

  const handleUpdate = async () => {
    if (!newDate || !newMembers) {
      alert('All fields are required!');
      return;
    }

    const response = await fetch(
      `https://sdev-project-server.vercel.app/api/v1/campgrounds/:campID/bookings/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingDate: newDate, members: newMembers }),
      }
    );

    if (response.ok) {
      alert('Booking updated successfully!');
      window.location.reload(); // Reload the page to fetch updated bookings
    } else {
      alert('Failed to update booking.');
    }
    handleClose();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    const response = await fetch(
      `https://sdev-project-server.vercel.app/api/v1/campgrounds/:campID/bookings/${bookingId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      alert('Booking deleted successfully!');
      window.location.reload(); // Reload the page to fetch updated bookings
    } else {
      alert('Failed to delete booking.');
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Booking</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Members</InputLabel>
            <Select
              value={newMembers}
              onChange={(e) => setNewMembers(Number(e.target.value))}
            >
              {Array.from(Array(8).keys()).map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
