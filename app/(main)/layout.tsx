import Header from "@/components/header";
import Footer from "@/components/footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { fetchSanityGlobalContent } from "@/sanity/lib/fetch";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchSanityGlobalContent();

  const header = {
    brandingType: data?.brandingTypeHeader,
    logo: data?.headerLogo,
    textLogo: data?.headerTextLogo,
    navItems: data?.headerNavItems,
  };

  return (
    <>
      <Header
        brandingType={header.brandingType!!}
        logo={header.logo!!}
        navItems={header.navItems!!}
        textLogo={header.textLogo!!}
      />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
