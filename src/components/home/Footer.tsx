import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Branding */}
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Deep
              </span>
              <span className="text-foreground">Code</span>
            </h2>

            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Where ideas meet innovation. Dive into insightful articles written
              by passionate thinkers and experts.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="space-y-3">
              {["All Articles", "Topics", "Authors", "Podcasts"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-6 text-sm"
                />
                <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <Button className="w-full" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ByteCode. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
