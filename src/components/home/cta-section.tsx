import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ctaData } from "@/data/homepage";

export function CtaSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{ctaData.title}</h2>
          <p className="mt-4 text-lg opacity-90">{ctaData.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={ctaData.primaryCta.href}>{ctaData.primaryCta.text}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href={ctaData.secondaryCta.href}>{ctaData.secondaryCta.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

