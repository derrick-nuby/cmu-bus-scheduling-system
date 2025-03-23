import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { heroData } from "@/data/homepage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-9 lg:py-12 px-4 md:px-20">
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{heroData.title}</h1>
              <p className="text-lg text-muted-foreground md:text-xl">{heroData.subtitle}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={heroData.primaryCta.href}>{heroData.primaryCta.text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={heroData.secondaryCta.href}>{heroData.secondaryCta.text}</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl lg:h-[500px] xl:h-[600px]">
            <Image
              src={heroData.image || "/placeholder.svg"}
              alt="Bus tracking system in action"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

