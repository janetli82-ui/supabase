'use client'

import Link from "next/link";
import { HomePostType } from "../../lib/supabase/queries";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
 
  return (
    <div>
      {posts.map((post) => (
        <Link
          href={`/${post.slug}`}
          key={post.id}
          className="block border border-border rounded-2xl m-4 p-4 bg-white shadow-sm"
        >
          <h3 className="text-2xl font-bold">{post.title}</h3>
          <div className="flex justify-start items-center">
            {post.img_url?.map((img, index) => (
              <div key={index} >
               <img src={img} alt={img} className="mt-3 w-20 h-fit"/>
              </div>
            ))}
          </div>
          <p className="text-right text-muted text-sm">by {post.author.username}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomePosts;
