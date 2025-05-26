import Link from "next/link";
import Logo from "@/components/logo";
import { GlobalContent } from "@/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "About",
    href: "/about",
    target: false,
  },
];
type FooterProps = {
  logo: NonNullable<GlobalContent["footerLogo"]>;
  description: NonNullable<GlobalContent["footerDescription"]>;
  socialLinks: NonNullable<GlobalContent["socialLinks"]>;
  navItems: NonNullable<GlobalContent["footerLinks"]>;
};

export default function FooterCom(props: FooterProps) {
  const { logo, description, socialLinks, navItems: footerLinks } = props;

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="border-t px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          {logo?.asset?._ref && (
            <img
              src={urlFor(logo.asset._ref).url()}
              alt={logo.alt || "Footer Logo"}
              className="h-10 mb-4"
            />
          )}
          <div className="text-sm mb-2">
            {description || "Your default footer description goes here."}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks?.map(
              (link, i) =>
                link.icon &&
                link.url && (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={link.icon}
                      alt={link.platform || "social"}
                      className="h-5 w-5"
                    />
                  </a>
                )
            )}
          </div>
        </div>

        {/* Link Sections */}
        {footerLinks?.map((group, i) => (
          <div key={i}>
            {group.title && (
              <h4 className="font-semibold mb-2">{group.title}</h4>
            )}
            <ul className="space-y-1 text-sm">
              {group.links?.map((link, j) =>
                link.title && link.href ? (
                  <li key={j}>
                    <a href={link.href} className="hover:underline">
                      {link.title}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t mt-12 pt-6 text-sm flex justify-center items-center text-center">
        <p>
          Copyright &copy; GBKore ARC Pvt. Ltd. {new Date().getFullYear()}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
