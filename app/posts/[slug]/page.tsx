import prisma from "@/lib/db";
import Link from "next/link";

interface SinglePostParams {
  slug: String;
}

const SinglePost = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const count = prisma.post.count();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <Link href={`/posts`}>
        <h1 className="text-3xl font-semibold">{post?.title}</h1>
      </Link>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        <li key={post?.id} className="flex items-center justify-between px-5">
          {post?.content}
        </li>
      </ul>
    </main>
  );
};

export default SinglePost;
