export const heroData = {
  title: "Real-time Bus Tracking for Modern Organizations",
  subtitle:
    "Enhance passenger experience with accurate location data, reduce wait times, and optimize your transportation operations.",
  primaryCta: {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCta: {
    text: "View Demo",
    href: "/demo",
  },
  image: "https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg",
};

export const featuresData = [
  {
    title: "Real-time Tracking",
    description: "Track your buses in real-time with GPS precision, providing accurate ETAs to passengers.",
    icon: "map-pin",
    image: "https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg",
  },
  {
    title: "Passenger Notifications",
    description: "Automatically notify passengers about delays, route changes, and bus arrivals.",
    icon: "bell",
    image: "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg",
  },
  {
    title: "Route Optimization",
    description: "Analyze traffic patterns and passenger data to optimize routes and schedules.",
    icon: "route",
    image: "https://images.pexels.com/photos/2799475/pexels-photo-2799475.jpeg",
  },
  {
    title: "Driver App",
    description: "Provide drivers with navigation, passenger counts, and communication tools.",
    icon: "smartphone",
    image: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg",
  },
  {
    title: "Analytics Dashboard",
    description: "Gain insights into ridership, on-time performance, and operational efficiency.",
    icon: "bar-chart",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  },
  {
    title: "Multi-platform Access",
    description: "Access the system via web, mobile apps, and digital signage for complete flexibility.",
    icon: "layers",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
  },
];

export const pricingData = {
  title: "Simple, Transparent Pricing",
  description: "Choose the plan that fits your organization's needs.",
  plans: [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small organizations with up to 5 buses.",
      features: [
        "Real-time GPS tracking",
        "Basic passenger app",
        "Email support",
        "Up to 5 buses",
        "1 route",
        "Basic analytics",
      ],
      cta: {
        text: "Get Started",
        href: "/signup?plan=starter",
      },
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Ideal for growing organizations with up to 20 buses.",
      features: [
        "Everything in Starter",
        "Advanced passenger app",
        "Priority email & phone support",
        "Up to 20 buses",
        "10 routes",
        "Advanced analytics",
        "Route optimization",
        "Driver app",
      ],
      cta: {
        text: "Get Started",
        href: "/signup?plan=professional",
      },
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations with complex needs.",
      features: [
        "Everything in Professional",
        "Unlimited buses",
        "Unlimited routes",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom integrations",
        "On-premise deployment option",
        "SLA guarantees",
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact-sales",
      },
      popular: false,
    },
  ],
};

export const testimonialsData = [
  {
    quote:
      "BUSM has transformed our campus transportation system. Students love knowing exactly when their bus will arrive.",
    author: "Sarah Johnson",
    title: "Transportation Director",
    organization: "State University",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    quote: "The analytics dashboard has helped us optimize our routes and save over 15% in fuel costs.",
    author: "Michael Chen",
    title: "Operations Manager",
    organization: "Metro Transit Authority",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    quote: "Implementation was smooth and the support team has been incredibly responsive to our needs.",
    author: "Priya Patel",
    title: "IT Director",
    organization: "City Transit",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
  },
];

export const statsData = [
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "25M+",
    label: "Passenger Trips",
  },
  {
    value: "500+",
    label: "Organizations",
  },
  {
    value: "32",
    label: "Countries",
  },
];

export const partnersData = [
  {
    name: "University of Technology",
    logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
  },
  {
    name: "Metro Transit",
    logo: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg",
  },
  {
    name: "City Transport",
    logo: "https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg",
  },
  {
    name: "Corporate Shuttle Co.",
    logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
  },
  {
    name: "School District Transportation",
    logo: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
  },
];

export const ctaData = {
  title: "Ready to transform your transportation system?",
  description: "Join hundreds of organizations already using BUSM to improve their bus operations.",
  primaryCta: {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCta: {
    text: "Contact Sales",
    href: "/contact-sales",
  },
};

export const faqData = [
  {
    question: "How accurate is the real-time tracking?",
    answer:
      "Our GPS tracking provides accuracy within 2-5 meters in most conditions. Updates are transmitted every 3-5 seconds to ensure passengers always have the most current information.",
  },
  {
    question: "Can passengers see multiple buses on the same route?",
    answer:
      "Yes, passengers can see all buses operating on a route, including their current locations and estimated arrival times at specific stops.",
  },
  {
    question: "How difficult is it to implement the system?",
    answer:
      "Implementation typically takes 2-4 weeks depending on the size of your fleet. Our team handles the entire process, including hardware installation, software setup, and training for your staff.",
  },
  {
    question: "Do you offer custom integrations with existing systems?",
    answer:
      "Yes, we offer API access and custom integrations with scheduling systems, payment platforms, and other transportation management software.",
  },
  {
    question: "What hardware is required?",
    answer:
      "Each bus requires a GPS tracking device that we provide as part of the subscription. The device is compact and easily installed in any vehicle.",
  },
]

