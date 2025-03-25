export async function addToFavorites(token: string, campgroundId: string) {
    const favoritesResponse = await fetch("https://sdev-project-server.vercel.app/api/v1/favorites", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!favoritesResponse.ok) {
        throw new Error("Failed to fetch favorites");
    }

    const favorites = await favoritesResponse.json();

    // Ensure favorites is an array
    const favoritesArray = Array.isArray(favorites) ? favorites : [];

    // Check if the campground is already in favorites
    const isAlreadyFavorite = favoritesArray.some((fav: { campground: string }) => fav.campground === campgroundId);
    if (isAlreadyFavorite) {
        throw new Error("Campground is already in favorites");
    }

    const response = await fetch("https://sdev-project-server.vercel.app/api/v1/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            campground: campgroundId,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to add to favorites");
    }

    return await response.json();
}

export async function removeFromFavorites(token: string, favoriteId: string) {
    const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to remove from favorites");
    }

    return await response.json();
}
