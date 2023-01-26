import { json } from "@remix-run/node";
import { print, type DocumentNode } from 'graphql';

export const graphqlRequest = async <T>(query: DocumentNode, variables?: Record<string, any>): Promise<T> => {
    const url = process.env.API_URL as string;
    const apiKey = process.env.API_TOKEN as string;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ query: print(query), variables })
    });

    const { data, errors } = await res.json();

    if (errors) {
        console.log(errors);

        throw json("Error", { status: 500 });
    }

    return data;
}