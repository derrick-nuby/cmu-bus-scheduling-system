import { statsData } from "@/data/homepage"

export function StatsSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-lg text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

