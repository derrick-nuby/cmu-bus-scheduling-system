import Image from "next/image"

import { partnersData } from "@/data/homepage"

export function PartnersSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Trusted by Organizations Worldwide
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {partnersData.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative h-16 w-32 overflow-hidden grayscale transition-all hover:grayscale-0">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

