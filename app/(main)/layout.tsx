import Header from "@/components/header";
import Footer from "@/components/footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { fetchSanityCategories, fetchSanityGlobalContent } from "@/sanity/lib/fetch";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchSanityGlobalContent();
  const categori = await fetchSanityCategories();
  console.log("fetchSanityCategories", categori);
  const header = {
    logo: data?.headerLogo,
    navItems: data?.headerNavItems,
  };
  const footer = {
    logo: data?.footerLogo,
    description: data?.footerDescription,
    socialLinks: data?.socialLinks,
    navItems: data?.footerLinks,
  };

  return (
    <>
      <Header logo={header.logo!!} navItems={header.navItems!!} />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer
        description={footer.description!!}
        logo={footer.logo!!}
        navItems={footer.navItems!!}
        socialLinks={footer.socialLinks!!}
      />
    </>
  );
}
