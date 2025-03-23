import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-[200px]">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <span>{post.author.name}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline self-start">
          Read more
        </Link>
      </CardContent>
    </Card>
  );
}

