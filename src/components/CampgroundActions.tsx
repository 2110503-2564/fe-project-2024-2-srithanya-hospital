'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeFromFavorites } from '@/libs/userFavourite';

interface CampgroundData {
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  image: string;
  description: string;
  region: string;
}

interface CampgroundActionsProps {
  token: string;
  campgroundId?: string; // Optional for "Add Campground" or "Delete Campground"
  isAdmin: boolean; // Determines if the button is for adding or deleting
  favorites?: { _id: string; campground: string }[]; // List of user's favorites
}

export default function CampgroundActions({
  token,
  campgroundId,
  isAdmin,
  favorites = [],
}: CampgroundActionsProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CampgroundData>({
    name: '',
    address: '',
    district: '',
    province: '',
    postalcode: '',
    tel: '',
    image: '',
    description: '',
    region: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleAddCampground = async () => {
    try {
      const response = await fetch('https://sdev-project-server.vercel.app/api/v1/campgrounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        alert('Campground added successfully!');
        setShowForm(false);
        router.refresh();
      } else {
        const errorData = await response.text();
        alert(`Failed to add campground: ${errorData}`);
      }
    } catch (error) {
      console.error('Error adding campground:', error);
      alert('An error occurred while adding the campground');
    }
  };

  const handleDeleteCampground = async () => {
    if (!campgroundId) return;

    const confirmDelete = confirm('Are you sure you want to delete this campground?');
    if (!confirmDelete) return;

    try {
      // Delete the campground
      const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/campgrounds/${campgroundId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete campground');
      }

      // Remove the campground from favorites
      const favoriteToDelete = favorites.find((fav) => fav.campground === campgroundId);
      if (favoriteToDelete) {
        await removeFromFavorites(token, favoriteToDelete._id);
      }

      alert('Campground deleted successfully!');
      router.refresh();
    } catch (error) {
      console.error('Error deleting campground:', error);
      alert('An error occurred while deleting the campground');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return isAdmin ? (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className={`px-6 py-3 rounded-lg mb-4 shadow-md transition-all duration-300 transform             ${showForm ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300 active:bg-green-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-300 active:bg-red-500'} text-white hover:scale-105 active:scale-95 focus:ring-4`}
      >
        {showForm ? 'Cancel' : 'Add Campground'}
      </button>
      {showForm && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Campground</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCampground();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">District:</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Province:</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Postal Code:</label>
              <input
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Telephone:</label>
              <input
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Region:</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  ) : (
    <button
      onClick={handleDeleteCampground}
      className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded shadow transition-all duration-300 transform hover:bg-red-600 hover:scale-105 active:bg-red-700 active:scale-95 focus:ring-2 focus:ring-red-300 text-sm"
    >
      Delete
    </button>
  );
}
