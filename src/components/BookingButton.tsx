'use client';

import { useState } from 'react';
import { bookCampground } from '@/libs/bookCampground';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function BookingButton({ campgroundId, token }: { campgroundId: string, token: string }) {
  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [nameLastname, setNameLastname] = useState('');
  const [members, setMembers] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBooking = async () => {
    if (!bookingDate || !nameLastname || !members) {
      alert("All fields are required!");
      return;
    }

    try {
      const success = await bookCampground(campgroundId, bookingDate, token, nameLastname, members );
      if (success) {
        alert("Booking successful!");
        handleClose();
      } else {
        alert("Booking failed!");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <>
      <button 
        onClick={handleOpen} 
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Name-Lastname"
            fullWidth
            value={nameLastname}
            onChange={(e) => setNameLastname(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Members</InputLabel>
            <Select
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
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
          <Button onClick={handleBooking} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
