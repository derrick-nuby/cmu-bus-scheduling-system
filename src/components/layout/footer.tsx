import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import { footerLinks, socialLinks } from "@/constants/navigation";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // System status - this would typically be fetched from an API
  const systemStatus = {
    status: "operational",
    lastUpdated: "2 minutes ago",
    uptime: "99.9%",
  };

  return (
    <footer className="bg-muted/40 border-t px-4 md:px-20">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-primary">BUSM</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Real-time bus tracking system for organizations, universities, and transit agencies. Enhance passenger
              experience with accurate location data.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href={socialLinks[0].href} target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href={socialLinks[1].href} target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href={socialLinks[2].href} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href={socialLinks[3].href} target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={socialLinks[4].href} target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={socialLinks[5].href} target="_blank" rel="noreferrer">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Solutions</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Partners</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.partners.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">System Status</h3>
            <div className="mt-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex items-center">
                <div
                  className={`h-3 w-3 rounded-full ${systemStatus.status === "operational" ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="ml-2 text-sm font-medium">
                  {systemStatus.status === "operational" ? "All Systems Operational" : "System Disruption"}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Last updated: {systemStatus.lastUpdated}</p>
                <p>Uptime: {systemStatus.uptime}</p>
              </div>
              <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs" asChild>
                <Link href="/system-status">View detailed status</Link>
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Subscribe to our newsletter for updates on new features and releases.
              </p>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {currentYear} BUSM. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

