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
        window.location.href = '/mybooking'; // Redirect to bookings page after booking
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
        className="mt-5 px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold rounded-lg shadow-md hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Book Now
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-gray-900 font-bold text-2xl text-center">
        Booking Details
      </DialogTitle>

      <DialogContent className="space-y-4 px-6 pb-4">
        <TextField
          label="Booking Date"
          type="date"
          fullWidth
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className="rounded-lg mt-2"
        />
        <TextField
          label="Name - Lastname"
          fullWidth
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
          margin="normal"
          className="rounded-lg"
        />
        <FormControl fullWidth className="mt-2">
          <TextField
            label="Number of Members"
            select
            fullWidth
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            className="rounded-lg"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
              <MenuItem key={num} value={num}>
                {num} {num === 1 ? "Member" : "Members"}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </DialogContent>
      <DialogActions className="flex justify-between px-6 pb-4">
        <Button
          onClick={handleClose}
          className="text-red-500 font-semibold hover:text-red-600 transition-all"
        >
          Cancel
        </Button>
        <Button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
