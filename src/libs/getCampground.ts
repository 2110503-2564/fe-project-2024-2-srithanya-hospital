export async function getCampground(_id: string) {
  const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/campgrounds/${_id}`, {
    cache: 'no-store', // Disable caching to ensure fresh data
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch campground with ID: ${_id}`);
  }
  return response.json();
}
