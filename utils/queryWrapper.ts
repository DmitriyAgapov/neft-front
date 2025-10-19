export const queryWrapper = async (query:string, variables?: Record<string, unknown>) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.NEXT_PUBLIC_NEXT_API);
    console.log(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API)
    const response = await fetch(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API as string, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: variables

        }),
        next: { revalidate: 3600 }

    })
    console.log(JSON.stringify({
        query: query,
        variables: variables

    }))
    const data = await response.json()
    return data.data;
}

