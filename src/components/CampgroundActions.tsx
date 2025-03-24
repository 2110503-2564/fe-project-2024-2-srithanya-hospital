'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  campgroundId?: string; // Optional for "Add Campground"
  isAdmin: boolean; // Determines if the button is for adding or deleting
}

export default function CampgroundActions({
  token,
  campgroundId,
  isAdmin,
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
        body: JSON.stringify({ token, ...formData }),
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
    const confirmDelete = confirm('Are you sure you want to delete this campground?');
    if (!confirmDelete) return;

    const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/campgrounds/${campgroundId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert('Campground deleted successfully!');
      router.refresh();
    } else {
      alert('Failed to delete campground.');
      console.log('Delete Error:', await response.text());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return isAdmin ? (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
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
      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
    >
      Delete
    </button>
  );
}
