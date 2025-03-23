import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog-posts";
import Image from "next/image";

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
          alt="Blog hero image"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Insights, tips, and industry news related to modern transit solutions
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container py-16 px-4 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Welcome to our Blog! This is your go-to resource for insights, tips, and industry news related to modern
            transit solutions. Our blog is dedicated to helping transit operators, technology enthusiasts, and everyday
            commuters understand the evolving landscape of transportation.
          </p>
          <p className="text-lg text-muted-foreground mt-4">
            Whether you&apos;re looking for expert tips, success stories, or in-depth analysis of emerging trends, our blog
            is designed to keep you informed and inspired. Explore our latest posts below and join the conversation on
            how technology is transforming the way we move.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container pb-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold mb-8">Featured Post</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={blogPosts[0].coverImage || "/placeholder.svg"}
              alt={blogPosts[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-4 flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={blogPosts[0].author.avatar || "/placeholder.svg"}
                  alt={blogPosts[0].author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <span>{blogPosts[0].author.name}</span>
                <span className="mx-2">•</span>
                <time dateTime={blogPosts[0].date}>
                  {new Date(blogPosts[0].date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h3>
            <p className="text-lg text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
            <p className="text-lg text-muted-foreground mb-6">
              By integrating real-time bus tracking and dynamic route management, our platform enables transit operators
              to make quick decisions that improve punctuality and service quality. This technological advancement is
              not just about tracking buses; it&apos;s about rethinking how transportation systems operate, reducing delays,
              and optimizing resources.
            </p>
            <a
              href={`/blog/${blogPosts[0].slug}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="bg-muted/40 py-16 px-4 md:px-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

