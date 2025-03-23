import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Route, UserCheck, BarChart, Bell, Layout, Settings, Link2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg"
          alt="Bus tracking system"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Features</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the powerful capabilities of our transit tracking and management platform
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container py-16 px-4 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Welcome to our Features page. Here, you&apos;ll discover the powerful capabilities of our transit tracking and
            management platform. Each feature is designed with one goal in mind: to provide you with reliable, real-time
            data and intuitive tools that make transit operations smoother and more efficient. Read on to learn how our
            features benefit you.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container pb-24 px-4 md:px-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Real-Time Bus Tracking</h2>
              <h3 className="text-xl font-semibold mb-2">Instant Location Updates</h3>
              <p className="text-muted-foreground mb-4">
                Our platform provides accurate, real-time updates on bus locations. By leveraging GPS technology and
                smart algorithms, you can see exactly where each bus is at any moment.
              </p>
              <p className="text-muted-foreground">
                This feature is ideal for transit operators who need to monitor their fleet and for passengers who want
                to plan their journeys without uncertainty.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Route className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Efficient Route Management</h2>
              <h3 className="text-xl font-semibold mb-2">Create, Edit, and Optimize Routes</h3>
              <p className="text-muted-foreground mb-4">
                Our route management tools allow you to easily create and update bus routes. With a user-friendly
                interface, you can define stops, adjust schedules, and optimize routes to better serve your community.
              </p>
              <p className="text-muted-foreground">
                This feature ensures that transit systems remain flexible and responsive to changing demands.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Advanced Passenger Check-In</h2>
              <h3 className="text-xl font-semibold mb-2">Monitor Boarding and Waiting Status</h3>
              <p className="text-muted-foreground mb-4">
                Keep track of passenger movements with our check-in feature. Whether passengers are waiting, boarding,
                or have completed their journey, our system captures every detail.
              </p>
              <p className="text-muted-foreground">
                This not only helps in managing crowd flow but also provides valuable insights into passenger behavior
                and route efficiency.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Comprehensive Analytics Dashboard</h2>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights for Better Decisions</h3>
              <p className="text-muted-foreground mb-4">
                Our analytics dashboard compiles key performance metrics and presents them in easy-to-understand charts
                and graphs. From bus performance to passenger trends, every data point is available at your fingertips.
              </p>
              <p className="text-muted-foreground">
                Use these insights to refine your operations and make data-driven decisions that enhance overall service
                quality.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Bell className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Instant Alerts and Notifications</h2>
              <h3 className="text-xl font-semibold mb-2">Stay Ahead with Real-Time Alerts</h3>
              <p className="text-muted-foreground mb-4">
                Receive immediate notifications about delays, route changes, or unexpected events. Our alert system
                ensures that both transit operators and passengers are informed as soon as issues arise.
              </p>
              <p className="text-muted-foreground">
                With proactive communication, you can quickly address problems and minimize disruptions to your
                schedule.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Layout className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">User-Friendly Dashboard</h2>
              <h3 className="text-xl font-semibold mb-2">Intuitive Design for Easy Navigation</h3>
              <p className="text-muted-foreground mb-4">
                The heart of our platform is a clean, modern dashboard that puts critical information front and center.
                Designed with simplicity in mind, the dashboard allows you to access all key features with just a few
                clicks.
              </p>
              <p className="text-muted-foreground">
                Enjoy a seamless experience that makes managing transit operations both efficient and enjoyable.
              </p>
            </div>
          </div>

          {/* Feature 7 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Customizable Settings</h2>
              <h3 className="text-xl font-semibold mb-2">Tailor the Platform to Your Needs</h3>
              <p className="text-muted-foreground mb-4">
                Every transit operation is unique. That&apos;s why our platform offers customizable settings that let you
                adjust everything from notification preferences to data display options.
              </p>
              <p className="text-muted-foreground">
                With a few simple tweaks, you can create a personalized experience that fits your specific requirements.
              </p>
            </div>
          </div>

          {/* Feature 8 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Link2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Seamless Integration</h2>
              <h3 className="text-xl font-semibold mb-2">Connect with Your Existing Systems</h3>
              <p className="text-muted-foreground mb-4">
                Our solution is designed to integrate effortlessly with a wide range of third-party tools and platforms.
                Whether you need to sync with payment gateways, scheduling software, or external data sources, our
                platform is built to work in harmony with your existing ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="bg-muted/40 py-24 px-4 md:px-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">See Our Features in Action</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg"
                  alt="Real-time tracking"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your entire fleet with precision GPS tracking and get instant updates on bus locations.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
                  alt="Analytics dashboard"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights with comprehensive analytics that help you optimize routes and improve service.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Multi-platform access"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Multi-Platform Access</h3>
                <p className="text-muted-foreground">
                  Access your transit management system from any device, anywhere, ensuring you&apos;re always connected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

