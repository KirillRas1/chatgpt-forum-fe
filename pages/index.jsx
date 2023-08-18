import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  return <div>
  <h3 onClick={() => {router.push({ pathname: `/posts/` });}}>Posts</h3>
</div>;
}
