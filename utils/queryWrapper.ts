export const queryWrapper = async (query:string, variables?: Record<string, unknown>) => {
    const response = await fetch(process.env.NEXT_API as string, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: variables

        }),

    })
    console.log(JSON.stringify({
        query: query,
        variables: variables

    }))
    const data = await response.json()
    return data.data;
}

