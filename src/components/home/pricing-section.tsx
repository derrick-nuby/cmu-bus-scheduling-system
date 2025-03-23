import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingData } from "@/data/homepage";

export function PricingSection() {
  return (
    <section className="py-20 md:py-24 lg:py-32 px-4 md:px-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pricingData.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{pricingData.description}</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingData.plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-  index) => (
            <Card 
              key={index} 
              className={\`flex flex-col justify-between ${plan.popular ? "border-primary shadow-md" : ""}`}
            >
              <CardHeader>
                {plan.popular && <Badge className="mb-2 w-fit">Most Popular</Badge>}
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href={plan.cta.href}>{plan.cta.text}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

