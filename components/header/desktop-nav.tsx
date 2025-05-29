import Link from "next/link";
import { NavItem } from "@/types";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  console.log("DesktopNav rendered with navItems:", navItems);

  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      {navItems.map((navItem) => {
        const isProducts = navItem.label.toLowerCase() === "products";

        return (
          <div key={navItem.label} className="relative group">
            <Link
              href={navItem.href}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
            >
              {navItem.label}
            </Link>

            {/* Submenu */}
            {navItem.subMenu && (
              <div className="absolute top-3 left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-md z-10">
                <ul className="py-2">
                  {navItem.subMenu.map((subItem) => (
                    <li key={subItem.label} className="relative group/submenu">
                      <Link
                        href={
                          isProducts
                            ? `/products?category=${encodeURIComponent(subItem.label)}`
                            : subItem.href
                        }
                        target={subItem.target ? "_blank" : undefined}
                        rel={subItem.target ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {subItem.label}
                      </Link>

                      {/* Sub-Submenu */}
                      {subItem.subSubMenu && (
                        <div className="absolute top-0 left-full mt-0 ml-1 hidden group-hover/submenu:block bg-white shadow-lg rounded-md z-20">
                          <ul className="py-2">
                            {subItem.subSubMenu.map((subSubItem) => (
                              <li key={subSubItem.label}>
                                <Link
                                  href={
                                    isProducts
                                      ? `/products?category=${encodeURIComponent(subItem.label)}&subcategory=${encodeURIComponent(subSubItem.label)}`
                                      : subSubItem.href
                                  }
                                  target={subSubItem.target ? "_blank" : undefined}
                                  rel={subSubItem.target ? "noopener noreferrer" : undefined}
                                  className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                                >
                                  {subSubItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}


    </div>
  );
}
