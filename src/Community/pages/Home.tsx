
import { Layout } from "../components/layout/Layout";
import { Feed } from "../components/feed/Feed";

export default function Home() {
  return (
    <Layout>
      <div className="animate-fade-in">
        <Feed />
      </div>
    </Layout>
  );
}
