export const queryWrapper = async (query:string, variables?: Record<string, unknown>) => {
    console.log('NODE_ENV', process.env.NODE_ENV);

	const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API as string;
	console.log('url', url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: variables

        }),
		cache: "no-cache",
        next: { revalidate: 3600 }

    })
    const data = await response.json()

    return data.data;
}

