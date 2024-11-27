

export default async function tokenUpdate(
    oldToken: string,
    clientSecret: string,
    refreshTimeHours: number
) {
    'use server';
    if (!oldToken || !clientSecret) {
        console.error("Missing required parameters");
    }
    console.log("Access token renewed:");
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&client_secret=${clientSecret}&access_token=${oldToken}`

    try {
        const response = await fetch(url, { next: { revalidate: 60 * 60 * refreshTimeHours * 1000 } });

        if (!response.ok) {
            throw new Error(
                `Failed to renew access token: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        console.log(data, "data");
        return data.access_token;
    } catch (error) {
        console.error("Error renewing access token:", error);
        return null;
    }
}

