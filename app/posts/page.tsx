import { createPost } from "@/lib/actions";
import prisma from "@/lib/db";
import Link from "next/link";

const PostPage = async () => {
  const posts = await prisma.post.findMany({
    where: {
      // title: {
      //   contains: "My",
      // },
      // published: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
    // take: 10,
    // skip: 10,
  });

  const userPosts = await prisma.user.findUnique({
    where: { email: "ngary@gmail.com" },
    include: { posts: true },
  });

  console.log("User posts :", userPosts);

  // Post length
  const count = prisma.post.count();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts ({count})</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {userPosts?.posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm text-black "
        />
        <textarea
          rows={5}
          name="content"
          placeholder="Content"
          className="px-2 py-1 rounded-sm text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          {" "}
          Create a post
        </button>
      </form>
    </main>
  );
};

export default PostPage;
