'use client';

import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface UpdateButtonProps {
  campgroundId: string;
  token: string;
}

export default function UpdateButton({ campgroundId, token }: UpdateButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    tel: '',
    description: '',
    image: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', address: '', tel: '', description: '', image: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.address || !formData.tel || !formData.description || !formData.image) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await fetch(
        `https://sdev-project-server.vercel.app/api/v1/campgrounds/${campgroundId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Campground updated successfully!');
        window.location.reload(); // Reload the page to fetch updated details
      } else {
        alert('Failed to update campground.');
      }
    } catch (error) {
      console.error('Error updating campground:', error);
      alert('An error occurred while updating the campground.');
    }
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Update Campground
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="text-gray-900 font-bold text-2xl text-center">
          Update Campground
        </DialogTitle>
        <DialogContent className="space-y-4 px-6 pb-4">
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg"
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            className="rounded-lg"
          />
          <TextField
            label="Telephone"
            name="tel"
            fullWidth
            value={formData.tel}
            onChange={handleChange}
            className="rounded-lg"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="rounded-lg"
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            value={formData.image}
            onChange={handleChange}
            className="rounded-lg"
          />
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
    </>
  );
}
