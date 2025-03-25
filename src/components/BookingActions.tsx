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
      if (window.confirm('Booking deleted successfully!')) {
        // Reload the page to fetch updated bookings
      }
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="text-gray-900 font-bold text-2xl text-center">
          Update Booking
        </DialogTitle>
        <DialogContent className="space-y-4 px-6 pb-4">
          <TextField
            label="Booking Date"
            type="date"
            fullWidth
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="rounded-lg mt-2"
          />
        <TextField
          select
          label="Number of Members"
          fullWidth
          value={newMembers}
          onChange={(e) => setNewMembers(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
          className="rounded-lg mt-2"
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
            <MenuItem key={num} value={num}>
              {num} {num === 1 ? "Member" : "Members"}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
        <DialogActions className="flex justify-between px-6 pb-4">
          <Button
            onClick={handleClose}
            className="text-red-500 font-semibold hover:text-red-700 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
