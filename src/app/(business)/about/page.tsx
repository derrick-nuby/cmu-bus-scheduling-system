import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg"
          alt="Team working together"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the story behind our mission to transform public transportation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-24 px-4 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Welcome to Our World of Innovative Transit Solutions</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At our company, we believe that every journey matters. Founded by an individual with a passion for
              transforming daily commutes, our mission is to empower transit operators and passengers alike with the
              tools they need to navigate modern transportation challenges.
            </p>
            <p className="text-lg text-muted-foreground">
              We are dedicated to providing a platform that not only tracks buses in real time but also enhances the
              overall travel experience through cutting-edge technology and data-driven insights.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission: Empowering Every Journey</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            Our mission is simple yet profound: to make public transportation more reliable, efficient, and
            user-friendly. We strive to bridge the gap between outdated transit systems and the dynamic, real-time needs
            of modern commuters.
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            Through our innovative platform, we aim to offer accurate bus location updates, streamlined route
            management, and actionable insights that help transit operators optimize their services. We believe that by
            putting the right information in the hands of the right people, we can make every journey smoother, safer,
            and more enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[400px] rounded-lg overflow-hidden md:order-2">
            <Image
              src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
              alt="Future vision"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold mb-6">Our Vision: A Future of Seamless Transportation</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Looking forward, our vision is to revolutionize the way people think about public transportation. We see a
              future where every bus, regardless of its size or route, is connected to a network that provides real-time
              updates, intelligent scheduling, and proactive support.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform is designed to evolve with emerging technologies, ensuring that we remain at the forefront of
              the transit industry. With an eye toward sustainability and accessibility, we aim to create a future where
              efficient transportation is not a luxury but a standard for communities everywhere.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Values: Integrity, Innovation, and Inclusion</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Integrity</h3>
                <p className="text-muted-foreground">
                  We are committed to transparency, ethical practices, and building trust with every user. Our data is
                  accurate, our processes are secure, and our intentions are always clear.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  Constant improvement is at the heart of our platform. We embrace new ideas and cutting-edge
                  technologies, always seeking creative solutions to the challenges of modern transit.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Inclusion</h3>
                <p className="text-muted-foreground">
                  We believe that reliable transportation should be available to everyone. Our platform is designed to
                  be accessible and user-friendly, ensuring that people from all walks of life can benefit from our
                  solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team: Passionate, Driven, and Committed</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            Though our company started as an individual vision, it has grown into a dedicated team of professionals who
            share a common goal: to improve the public transit experience. Our team is comprised of technology
            enthusiasts, data analysts, design experts, and customer support specialists—all working together to build a
            platform that is as intuitive as it is powerful.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto">
            We invest in continuous learning and collaboration, ensuring that every member contributes their unique
            expertise to our mission.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Michael Chen</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Priya Patel</h3>
              <p className="text-muted-foreground">CTO</p>
            </div>
            <div className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-muted-foreground">Head of Product</p>
            </div>
            <div className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">David Rodriguez</h3>
              <p className="text-muted-foreground">Lead Developer</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">What Sets Us Apart</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            In a crowded market of transit solutions, our commitment to precision and real-time data stands out. We are
            not just another software provider; we are a partner in the daily journey of countless commuters.
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            Our platform is designed to adapt to the evolving needs of transit systems, offering a level of
            customization and flexibility that is unmatched. Whether you are a transit operator looking to optimize your
            routes or a passenger seeking reliable travel information, our solution is crafted with you in mind.
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            As we continue to grow and evolve, we remain steadfast in our dedication to quality and service. Our promise
            is to continually enhance our platform, listen to our users, and implement improvements that make a real
            difference in daily travel.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            With every update and every new feature, we reaffirm our commitment to excellence, ensuring that our
            platform remains the trusted companion for transit operators and passengers alike.
          </p>
        </div>
      </section>
    </>
  );
}

