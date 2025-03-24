export async function getCampgrounds() {
  const response = await fetch('https://sdev-project-server.vercel.app/api/v1/campgrounds', {
    cache: 'no-store', // Disable caching to ensure fresh data
  });
  if (!response.ok) {
    throw new Error('Failed to fetch campgrounds');
  }
  const result = await response.json();
  return result; // Ensure the full response is returned
}
