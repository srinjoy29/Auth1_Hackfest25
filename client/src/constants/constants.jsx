import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Aarav Mehta",
    company: "TechNova Solutions",
    image: user1,
    text: "The smart reply and AI writing features in Atom Mail have completely transformed how I manage emails. It saves me hours every week!",
  },
  {
    user: "Isha Kapoor",
    company: "BrightMind Startups",
    image: user2,
    text: "As a startup founder, I rely on quick and effective communication. Atom Mail's context-aware replies are a game-changer for our team.",
  },
  {
    user: "Rohit Verma",
    company: "NextGen Enterprises",
    image: user3,
    text: "The AI-driven summarization helps me focus on what matters most. It's like having a personal assistant in my inbox.",
  },
  {
    user: "Sneha Reddy",
    company: "MindfulTech Pvt. Ltd.",
    image: user4,
    text: "Atom Mail brings a whole new level of efficiency. From writing to follow-ups, the AI features make email management so much easier.",
  },
  {
    user: "Karan Malhotra",
    company: "VisionSpark AI",
    image: user5,
    text: "I was impressed by how well Atom Mail adapts to my tone and writing style. It feels natural and professional every time.",
  },
  {
    user: "Priya Nair",
    company: "Innovexa Labs",
    image: user6,
    text: "Managing emails used to be a chore. Now, thanks to Atom Mail’s smart tools, I actually enjoy clearing my inbox.",
  },
];


export const features = [
  {
    icon: <BotMessageSquare />,
    text: "AI-Powered Smart Replies",
    description:
      "Generate context-aware email responses instantly, saving time while maintaining a natural and professional tone.",
  },
  {
    icon: <Fingerprint />,
    text: "Personalized Writing Style",
    description:
      "Adapt AI-generated emails to match your unique communication style based on past conversations.",
  },
  {
    icon: <ShieldHalf />,
    text: "Enhanced Email Drafting",
    description:
      "Refine, rephrase, and optimize email drafts with AI suggestions to improve clarity and effectiveness.",
  },
  {
    icon: <BatteryCharging />,
    text: "Inbox Prioritization",
    description:
      "Automatically categorize and highlight important emails, ensuring you never miss a crucial message.",
  },
  {
    icon: <PlugZap />,
    text: "Seamless Integration",
    description:
      "Effortlessly integrate AI-powered features into Atom Mail without disrupting your workflow.",
  },
  {
    icon: <GlobeLock />,
    text: "Privacy-First AI",
    description:
      "Ensure data security with AI that processes emails locally, keeping your conversations private and protected.",
  },
];


export const checklistItems = [
  {
    title: "Smart Email Suggestions",
    description:
      "Let AI help you write faster with real-time suggestions that match your tone and context.",
  },
  {
    title: "Instant Summarization",
    description:
      "Quickly get the gist of long emails with AI-generated summaries, saving time and boosting productivity.",
  },
  {
    title: "Context-Aware Replies",
    description:
      "Generate accurate responses based on your past conversations and communication style.",
  },
  {
    title: "Seamless Collaboration",
    description:
      "Easily share drafts and collaborate on replies with your team, all within Atom Mail.",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "₹0",
    features: [
      "Private board sharing",
      "5 GB Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "₹799/month",
    features: [
      "Private board sharing",
      "10 GB Storage",
      "Web Analytics (Advanced)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "₹15,999/month",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Docs" },
  { href: "#", text: "API" },
  { href: "#", text: "Tutorials" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "System Requirements" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Careers" },
];
