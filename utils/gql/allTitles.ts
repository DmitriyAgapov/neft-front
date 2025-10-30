export const allTitles = `query AllTitlesWithUrl { categories { category title } products { slug title } }`
export const getTitles = () => fetch(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API as string, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: allTitles

    }),
    next: { revalidate: 3600 }

}).then(r => r.json());