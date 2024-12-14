import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
async function getPosts() {
    const cacheKey = `posts_page_1`;

    // Try to get cached data from Vercel KV
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //     return cachedData;
    // }
    // Fetch posts
    const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/?page=1`;
    const postsResponse = await fetch(postsUrl);
    const postsData = await postsResponse.json(); // Ensure response is parsed as JSON
    const posts = postsData?.results || [];

    const postDict = {};
    posts.forEach(post => {
        postDict[post.id] = post;
    });

    // Fetch scores
    const scoreResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post_score/?post__in=${Object.keys(postDict).join(',')}`
    );
    const scoreData = await scoreResponse.json(); // Ensure response is parsed as JSON
    scoreData.forEach(score => {
        postDict[score.post].user_score = score.upvote ? 1 : -1;
    });

    // Cache the result in Vercel KV with a 10-minute TTL
    // const cacheDuration = 10 * 60; // 10 minutes in seconds
    // await redis.set(cacheKey, postDict, { ex: cacheDuration });

    return postDict;
}

  export async function GET() {
    try {
      const initialPostData = await getPosts()
      return Response.json(initialPostData, {headers: {
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },})
    } catch (e) {
      console.log(e)
      return Response.json({'error': e}, {status: 500})
    }
    
  }