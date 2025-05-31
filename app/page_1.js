'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Index = () => {
  // const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <div className="grid min-h-screen w-full place-items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-blue-600 to-blue-800 text-white">
      <div className="container flex max-w-screen-xl flex-col items-center justify-center gap-6 px-4 py-24 text-center md:gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-white" />
            <h1 className="font-display text-5xl font-bold text-white">
              TrackPro
            </h1>
          </div>
          <p className="max-w-[70%] self-center text-lg text-white/80">
            The ultimate platform to submit, track, and manage complaints
            seamlessly.
          </p>
        </div>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/complaint"
          >
            Submit Complaint
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/track"
          >
            Track Ticket
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/demo"
          >
            Demo
          </Link>
        </nav>

        <section className="flex w-full flex-col items-center gap-16 md:gap-24">
          <section className="flex w-full flex-col items-center gap-8 md:gap-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Empowering Transparency and Resolution
            </h2>
            <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none bg-transparent text-white shadow-none">
                <CardHeader className="pb-2">
                  <HelpCircle className="h-6 w-6" />
                  <CardTitle className="text-base">Submit a Complaint</CardTitle>
                  <CardDescription className="text-sm text-white/60">
                    Raise your concerns with ease.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0 pt-2">
                  Describe your issue in detail and submit it to the relevant
                  organization.
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/complaint" className="w-full">
                    <Button className="w-full">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none bg-transparent text-white shadow-none">
                <CardHeader className="pb-2">
                  <MessageSquare className="h-6 w-6" />
                  <CardTitle className="text-base">Track Your Ticket</CardTitle>
                  <CardDescription className="text-sm text-white/60">
                    Stay informed every step of the way.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0 pt-2">
                  Enter your ticket ID or email to check the status and updates
                  on your complaint.
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/track" className="w-full">
                    <Button className="w-full">
                      Track Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none bg-transparent text-white shadow-none">
                <CardHeader className="pb-2">
                  <CheckCircle className="h-6 w-6" />
                  <CardTitle className="text-base">
                    Manage and Resolve
                  </CardTitle>
                  <CardDescription className="text-sm text-white/60">
                    Organizations can efficiently address complaints.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0 pt-2">
                  Our platform provides the tools to manage, assign, and
                  resolve complaints effectively.
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/dashboard" className="w-full">
                    <Button className="w-full">
                      Explore Features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="w-full">
            <div className="mx-auto flex w-full max-w-md flex-col gap-2">
              <h3 className="font-heading text-2xl font-bold text-white">
                Stay up to date
              </h3>
              <p className="text-sm text-white/70">
                Subscribe to our newsletter to get the latest news and updates.
              </p>
            </div>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Subscribe to our newsletter</CardTitle>
                <CardDescription>
                  Get the latest news and updates in your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    className="col-span-3"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan">Subscription plan</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe</Button>
              </CardFooter>
            </Card>
          </section>

          <section className="flex flex-col items-center gap-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/70">
              Join TrackPro today and experience seamless complaint management.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link href="/complaint">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Submit Complaint
                </Button>
              </Link>
              <Link href="/track">
                <Button variant="outline" size="lg">
                  Track Your Ticket
                </Button>
              </Link>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Index;
