export default async function addToFavorites(token: string, bookingDate: string, campgroundId: string) {
    const response = await fetch("https://sdev-project-server.vercel.app/api/v1/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookingDate,
            campground: campgroundId,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to add to favorites");
    }

    return await response.json();
}
