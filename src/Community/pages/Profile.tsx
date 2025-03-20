
import { Layout } from "../components/layout/Layout";
import { UserProfile } from "../components/profile/UserProfile";
import { Post } from "../components/feed/Post";
import { posts, users } from "../utils/mockData";

export default function ProfileX() {
  // Using the first user as example
  const user = users[0];
  // Filter posts by this user
  const userPosts = posts.filter(post => post.user.id === user.id);

  return (
    <Layout>
      <UserProfile user={user} />
      <div className="divide-y">
        {userPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
}
