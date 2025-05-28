import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { GlobalContent, NavItem } from "@/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type HeaderProps = {
  logo: GlobalContent["headerLogo"];
  navItems: NonNullable<GlobalContent["headerNavItems"]>;
};

export default function Header(props: HeaderProps) {
  const { logo, navItems } = props;
  console.log("Header props:", navItems);
  

  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          {logo?.asset?._ref && (
            <img
              src={urlFor(logo.asset._ref).url()}
              alt={logo.alt || ""}
              className="h-12 w-auto"
            />
          )}
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems as NavItem[]} />
          <ModeToggle />
        </div>
        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav navItems={navItems as NavItem[]} />
        </div>
      </div>
    </header>
  );
}
