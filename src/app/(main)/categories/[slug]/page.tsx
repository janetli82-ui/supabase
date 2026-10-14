import DeleteButton from "@/component/Button/deletePostButton";
import { getCategory, getPostsByCategory } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import { slugify } from "@/lib/supabase/slugify";
import Link from "next/link";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: category } = await getCategory(slug, supabase);
  if (!category) return <p>Category not found</p>;
  const { data: posts } = await getPostsByCategory(category.id, supabase);

  return (
    <div className="border border-border rounded-2xl mb-4 p-4 bg-white shadow-sm mt-3 grow">
      <div className="flex flex-col items-center m-4">
        <h3 className="text-2xl text-center p-3">{category.name}</h3>
        {posts?.map((post) => (
          <Link
            href={`/${slugify(post.title!)}`}
            key={post.id}
            className="border border-border rounded-xl p-4 mb-3 bg-white shadow-sm w-full"
          >
            <h4 className="font-bold">{post.title}</h4>
            <p className="text-muted text-sm mt-2">{post.content}</p>
            <div className="flex justify-start items-center gap-3">
              {post.img_url?.map((img, index) => (
                <div key={index} className="mt-3">
                  <img src={img} alt={img} width={80} />
                </div>
              ))}
            </div>
            {user?.id === post.author.id && (
              <div className="mt-6">
                <DeleteButton id={post.id} />
              </div>
            )}
            <p className="text-right text-muted text-sm">
              {" "}
              by {post.author.username}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
