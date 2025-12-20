export const queryWrapper = async (query:string, variables?: Record<string, unknown>) => {


	const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API as string;

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

