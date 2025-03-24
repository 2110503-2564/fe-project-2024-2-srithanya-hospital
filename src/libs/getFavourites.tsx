export default async function getFavourites(token: string) {
    const response = await fetch("https://sdev-project-server.vercel.app/api/v1/favorites", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch favourites");
    }

    const result = await response.json();

    // Extract the data field from the response
    const { data } = result;

    // Ensure the data field is an array
    if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array in the 'data' field");
    }

    // Map the campground field from the favorites
    return data.map((favorite) => favorite.campground);
}
