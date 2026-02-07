import { BASE_URL } from "../constants/api-config";
import type { IPostFilter, PostResponse } from "../types/posts";

export const getPosts = async (query: IPostFilter) => {
    const params = new URLSearchParams(query as unknown as Record<string, string>).toString();
    const endpoint = query.q ? "/posts/search" : "/posts"
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
    const data = await response.json();
    return data as PostResponse;
}