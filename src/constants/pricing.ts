export const PLANS = [
    {
        name: "Basic",
        info: "For small transit operators and local bus routes",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "Up to 5 Routes" },
            { text: "10 Buses", tooltip: "Manage up to 10 buses with basic tracking" },
            { text: "Standard live tracking", tooltip: "Receive real-time bus location updates" },
            { text: "Basic passenger check-in", tooltip: "Monitor boarding and waiting statuses" },
            { text: "Email support", tooltip: "Access community and email support" },
            { text: "Basic analytics", tooltip: "View basic transit performance statistics" },
            { text: "Bus Tracking branding", tooltip: "Powered by BUSM Bus Scheduling System" },
        ],
        btn: {
            text: "Get Started for Free",
            href: "/auth/sign-up?plan=basic",
            variant: "default",
        },
    },
    {
        name: "Pro",
        info: "For growing transit systems and mid-sized operators",
        price: {
            monthly: 29,
            yearly: Math.round(29 * 12 * (1 - 0.15)), // 15% discount for annual billing
        },
        features: [
            { text: "Up to 20 Routes" },
            { text: "50 Buses", tooltip: "Manage up to 50 buses with advanced tracking" },
            { text: "High-frequency live tracking", tooltip: "Receive high frequency GPS updates" },
            { text: "Passenger analytics", tooltip: "Detailed insights on boarding and offboarding" },
            { text: "Priority email support", tooltip: "Faster response times via email" },
            { text: "Advanced reporting dashboard", tooltip: "Customizable analytics and performance metrics" },
            { text: "Customizable alerts", tooltip: "Instant notifications for delays and schedule changes" },
        ],
        btn: {
            text: "Upgrade to Pro",
            href: "/auth/sign-up?plan=pro",
            variant: "purple",
        },
    },
    {
        name: "Enterprise",
        info: "For large transit networks and bus operators",
        price: {
            monthly: 99,
            yearly: Math.round(99 * 12 * (1 - 0.20)), // 20% discount for annual billing
        },
        features: [
            { text: "Unlimited Routes", tooltip: "No restrictions on the number of routes" },
            { text: "Unlimited Buses", tooltip: "Scale your fleet without limits" },
            { text: "Real-time & historical tracking", tooltip: "Access both live tracking and historical data" },
            { text: "Comprehensive analytics", tooltip: "Advanced reporting tailored for large fleets" },
            { text: "Dedicated account manager", tooltip: "Personalized support for your organization" },
            { text: "Custom integrations", tooltip: "Integrate with your existing systems seamlessly" },
            { text: "24/7 priority support", tooltip: "Round-the-clock assistance for critical operations" },
        ],
        btn: {
            text: "Contact Sales",
            href: "/auth/contact?plan=enterprise",
            variant: "default",
        },
    },
];

export const PRICING_FEATURES = [
    {
        text: "Real-time Bus Tracking",
        tooltip: "Accurate, up-to-date bus location information.",
    },
    {
        text: "Route Management",
        tooltip: "Create and manage multiple bus routes with ease.",
    },
    {
        text: "Live Passenger Updates",
        tooltip: "Monitor passenger statuses and boarding details in real time.",
    },
    {
        text: "Analytics Dashboard",
        tooltip: "View detailed statistics and reports on transit performance.",
    },
    {
        text: "Alerts & Notifications",
        tooltip: "Receive instant alerts on delays and schedule changes.",
    },
    {
        text: "Custom Integrations",
        tooltip: "Integrate seamlessly with third-party systems and tools.",
    },
    {
        text: "Scalable Solutions",
        tooltip: "Designed to grow with your transit operations.",
    },
];

export const WORKSPACE_LIMIT = 3; // Maximum number of workspaces (if applicable)
