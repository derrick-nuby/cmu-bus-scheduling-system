import Image from "next/image";
import { BarChart, Bell, Layers, MapPin, Route, Smartphone } from "lucide-react";

import { featuresData } from "@/data/homepage";

const iconMap = {
  "map-pin": MapPin,
  bell: Bell,
  route: Route,
  smartphone: Smartphone,
  "bar-chart": BarChart,
  layers: Layers,
};

export function FeaturesSection() {
  return (
    <section className="bg-muted/40 py-20 md:py-24 lg:py-32 px-4 md:px-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features for Modern Transit</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to manage and optimize your transportation system.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

