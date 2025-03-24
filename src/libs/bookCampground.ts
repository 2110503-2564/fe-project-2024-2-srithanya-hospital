export async function bookCampground(campgroundId: string, bookingDate: string, token: string, namelastname: string, members: Number): Promise<boolean> {
  try {
    const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/campgrounds/${campgroundId}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingDate,
        createdAt: new Date().toISOString(),
        namelastname,
        members
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error during booking API call:", error);
    throw error;
  }
}
