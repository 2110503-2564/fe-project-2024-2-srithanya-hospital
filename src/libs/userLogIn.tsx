export default async function userLogIn(userEmail: string, userPassword: string) {
    const response = await fetch("https://sdev-project-server.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return await response.json();
}
