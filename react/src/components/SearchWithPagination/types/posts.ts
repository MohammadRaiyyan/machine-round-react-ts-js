export interface IPostFilter {
    skip: string,
    limit: string,
    q: string,
}

export interface Post {
    id: string,
    title: string
}

export interface PostResponse {
    posts: Post[],
    total: number,
    skip: number,
    limit: number
}