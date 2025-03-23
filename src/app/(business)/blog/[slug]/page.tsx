'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";


export default function BlogPostPage() {
  const params = useParams<{ slug: string; }>();
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get full blog post content based on the slug
  let fullContent = "";

  if (post.slug === "how-our-platform-is-changing-the-industry") {
    fullContent = `
      <p>In today's fast-paced world, reliable public transportation is more important than ever. Our platform is revolutionizing the industry by providing real-time data and intelligent management tools that bring clarity and efficiency to every journey. In this post, we explore the key ways our system is setting new standards for transit operations.</p>
      
      <h2>A New Era of Transit Efficiency</h2>
      <p>By integrating real-time bus tracking and dynamic route management, our platform enables transit operators to make quick decisions that improve punctuality and service quality. This technological advancement is not just about tracking buses; it's about rethinking how transportation systems operate, reducing delays, and optimizing resources.</p>
      
      <p>Traditional transit systems often rely on static schedules and manual tracking methods, leading to inefficiencies and frustration for both operators and passengers. Our platform changes this paradigm by providing a dynamic, responsive system that adapts to real-world conditions in real-time.</p>
      
      <h2>Empowering Operators and Passengers</h2>
      <p>One of the most significant impacts of our platform is the empowerment of both transit operators and passengers. For operators, the ability to monitor fleet performance and adjust routes in real time means a smoother, more responsive service. For passengers, knowing exactly when and where their bus will arrive transforms the daily commute into a more predictable and stress-free experience.</p>
      
      <p>This dual empowerment creates a positive feedback loop: as operators provide better service, passenger satisfaction increases, leading to higher ridership and more resources for further improvements. It's a win-win situation that benefits the entire transit ecosystem.</p>
      
      <h2>Data-Driven Decisions</h2>
      <p>At the core of our platform is a powerful analytics engine that gathers and interprets vast amounts of data. This insight drives better decision-making, from scheduling to resource allocation, ensuring that every transit system can adapt to the demands of its community.</p>
      
      <p>By analyzing patterns in ridership, traffic conditions, and operational efficiency, our platform provides actionable insights that help transit authorities optimize their services. This data-driven approach leads to more efficient routes, better allocation of resources, and ultimately, a more sustainable and effective transit system.</p>
      
      <p>In essence, our platform is not only changing the industry—it's paving the way for a smarter, more efficient future in public transportation. As we continue to innovate and expand our capabilities, we remain committed to our mission of making public transit more reliable, efficient, and user-friendly for everyone.</p>
    `;
  } else if (post.slug === "5-tips-for-getting-the-most-out-of-our-features") {
    fullContent = `
      <p>Maximizing the benefits of our platform is all about understanding and utilizing its core features. In this post, we share five practical tips to help you harness the full potential of our system.</p>
      
      <h2>1. Leverage Real-Time Tracking</h2>
      <p>Always keep an eye on your dashboard to monitor bus locations. Real-time data not only helps in managing fleet performance but also assists in predicting potential delays and planning alternative routes.</p>
      
      <p>To get the most out of real-time tracking, we recommend setting up custom views for different routes or areas of operation. This allows you to focus on specific parts of your transit network when needed, while still maintaining an overview of the entire system.</p>
      
      <h2>2. Customize Your Routes</h2>
      <p>Take advantage of our flexible route management tools. Regularly review and adjust your routes based on passenger trends and traffic patterns. This proactive approach ensures optimal service and efficiency.</p>
      
      <p>Consider using our A/B testing feature to compare different route configurations. By running parallel routes with slight variations, you can gather data on which options provide the best service for your passengers.</p>
      
      <h2>3. Utilize Analytics for Insights</h2>
      <p>Dive into the comprehensive analytics dashboard to track performance metrics. Identify trends, measure success, and make informed decisions that can significantly improve your transit operations over time.</p>
      
      <p>We recommend scheduling a weekly review of your analytics data. Look for patterns in ridership, on-time performance, and resource utilization. These insights can help you identify areas for improvement and measure the impact of changes you've implemented.</p>
      
      <h2>4. Set Up Instant Alerts</h2>
      <p>Configure notifications to receive immediate updates about any changes in service. Instant alerts allow you to react quickly to delays or disruptions, keeping both operators and passengers well-informed.</p>
      
      <p>Customize your alert thresholds based on the specific needs of your transit system. For high-frequency routes, you might want to be notified of smaller delays, while for less frequent services, you might set higher thresholds.</p>
      
      <h2>5. Engage with the Support Community</h2>
      <p>Don't hesitate to reach out to our support team or join our user forums. Sharing experiences and solutions can provide valuable insights and help you discover new ways to make the most of our features.</p>
      
      <p>Our community forums are a treasure trove of tips, tricks, and best practices from other transit operators. By actively participating in discussions and sharing your own experiences, you can learn from others and contribute to the collective knowledge of our user community.</p>
      
      <p>By following these tips, you'll be well on your way to transforming your transit management experience and delivering a superior service to your community. Remember, our support team is always available to help you implement these strategies and answer any questions you might have.</p>
    `;
  } else {
    fullContent = `
      <p>This is a placeholder for the full content of the blog post. In a real application, this content would be fetched from a database or CMS.</p>
      
      <p>The blog post would contain multiple paragraphs, headings, and possibly images or other media elements. It would provide valuable information related to the topic indicated by the title.</p>
      
      <p>For now, we're using this placeholder text to demonstrate the layout and styling of a blog post page.</p>
    `;
  }

  return (
    <>
      <article className="container py-16 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">Published on {formatDate(post.date)}</p>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: fullContent }} />

        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
          </div>
        </div>
      </article>
    </>
  );
}

// Import at the top
import { BlogCard } from "@/components/blog/blog-card"

