import { json } from "@remix-run/node";

export const graphqlRequest = async <T>(query: string): Promise<T> => {
    const url = process.env.API_URL as string;
    const apiKey = process.env.API_TOKEN as string;

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ query }),
    });

    const { data, errors } = await res.json();

    if (errors) {
        throw json("Error", { status: 500 });
    }

    return data;
}