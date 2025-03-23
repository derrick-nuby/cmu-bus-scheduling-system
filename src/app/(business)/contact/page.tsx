import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact/ContactForm";

// JSON object with all changeable text for the contact page
const TEXT = {
  heading: "Stay Connected with BUSM Bus Scheduling System",
  description:
    "Need assistance tracking buses in real time? Our system provides accurate location updates and route details to help you plan your journey effortlessly.",
  phone: "+250 788 123 456",
  phoneHref: "tel:+250788123456",
  email: "support@busscheduler.com",
  emailHref: "mailto:support@busscheduler.com",
  address: "Pittsburgh, PA",
  locationLinkText: "View Location on Google Maps",
  locationUrl: "https://goo.gl/maps/Example" // Replace with your actual Google Maps URL
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-28 py-16">
      <div className="grid gap-8 lg:grid-cols-2 mt-1 md:mt-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {TEXT.heading}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              {TEXT.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <a
                href={TEXT.phoneHref}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {TEXT.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={TEXT.emailHref}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {TEXT.email}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">
                {TEXT.address}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <a
                href={TEXT.locationUrl}
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {TEXT.locationLinkText}
              </a>
            </div>
          </div>
        </div>

        <Card className="p-6">
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}
