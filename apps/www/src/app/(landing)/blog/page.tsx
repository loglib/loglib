import Image from "next/image";
import Link from "next/link";
import { allAuthors, allBlogPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const getAuthor = (post) => {
    const authors = post.authors.map((author) =>
      allAuthors.find(({ slug }) => slug === `${author}`)
    );

    return authors;
  };
  const pinnedPost = posts[0];
  const nonPinnedPosts = posts.slice(1, posts.length);

  console.log("NOn pinned POst:", nonPinnedPosts);

  return (
    <div className="container max-w-7xl py-6 lg:py-10">
      {/* <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className=" text-white uppercase text-transparent font-heading tracking-tight text-3xl font-bold sm:text-6xl">
            🚀{"  "}BLOG
            
            <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black uppercase text-transparent">
              S
            </span>
          </h1>
    


          
        </div>
      </div>  */}
      {/* <hr className="my-8" /> */}

      <div className="">
        {pinnedPost ? (
          <div className="w-full mb-10 border-2 rounded-2xl from-purple-500 bg-gradient-to-br to-orange-800   p-[1px] outline-none">
            <article
              key={pinnedPost._id}
              className="group relative flex bg-black space-y-2  rounded-2xl  bg-gradient-to-br from-stone-900 border to-stone-850  p-[20px] text-white"
            >
              {pinnedPost.image && (
                <Image
                  src={pinnedPost.image}
                  alt={pinnedPost.title}
                  width={804}
                  height={452}
                  className="rounded-xl border bg-muted transition-colors"
                  priority={0 <= 1}
                />
              )}
              <div className="ml-5 py-6 flex flex-col gap-2 justify-end  ">
                {pinnedPost.description && (
                  <h2 className="text-3xl font-bold space-x-1">
                    {pinnedPost.title}
                  </h2>
                )}
                <h2 className="text-muted-foreground text-gray-500">
                  {pinnedPost.description}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getAuthor(pinnedPost)?.length ? (
                      <div className="mt-4 flex space-x-4">
                        {getAuthor(pinnedPost).map((author) =>
                          author ? (
                            <Link
                              key={author._id}
                              href={`https://twitter.com/${author.twitter}`}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <Image
                                src={author.avatar}
                                alt={author.title}
                                width={42}
                                height={42}
                                className="rounded-full bg-white"
                              />
                              <div className="flex-1 text-left leading-tight">
                                <p className="font-medium">{author.title}</p>
                                <p className="text-[12px] text-muted-foreground">
                                  @{author.twitter}
                                </p>
                              </div>
                            </Link>
                          ) : null
                        )}
                      </div>
                    ) : null}

                    {/* <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          sizes="sm"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className=" text-sm text-muted-foreground">KINFISH</p> */}
                  </div>

                  {pinnedPost.date && (
                    <p className="text-sm text-muted-foreground">
                      {formatDate(pinnedPost.date)}
                    </p>
                  )}
                </div>
                <Link
                  href={`/blog/${pinnedPost.slug}`}
                  className="absolute inset-0"
                >
                  <span className="sr-only">View Article</span>
                </Link>
              </div>
            </article>
          </div>
        ) : (
          ""
        )}
      </div>
      {nonPinnedPosts?.length ? (
        <div className="grid gap-10  sm:grid-cols-3">
          {nonPinnedPosts.map((post, index) => (
         
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2  rounded-2xl  bg-gradient-to-br from-stone-900 border to-stone-850   p-6 text-white"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-lg border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getAuthor(post)?.length ? (
                    <div className="mt-4 flex space-x-4">
                      {getAuthor(post).map((author) =>
                        author ? (
                          <Link
                            key={author._id}
                            href={`https://twitter.com/${author.twitter}`}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Image
                              src={author.avatar}
                              alt={author.title}
                              width={42}
                              height={42}
                              className="rounded-full bg-white"
                            />
                            <div className="flex-1 text-left leading-tight">
                              <p className="font-medium">{author.title}</p>
                              <p className="text-[12px] text-muted-foreground">
                                @{author.twitter}
                              </p>
                            </div>
                          </Link>
                        ) : null
                      )}
                    </div>
                  ) : null}
                </div>

                {post.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                )}
              </div>
              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        // )}

        <p>No posts published.</p>
      )}
    </div>
  );
}
