const BASE_URL = 'https://www.geppetaboard.com';

function generateSiteMap(posts) {
  return posts.map(({ id }) => ({ url: `${BASE_URL}/posts/${id}` }));
}
export default async function sitemap() {
  let posts;
  try {
    const request = await fetch(`https://kirillras.net/posts/`);
    posts = await request.json();
  } catch {
    posts = [];
  }
  return [{ url: BASE_URL }, ...generateSiteMap(posts)];
}
