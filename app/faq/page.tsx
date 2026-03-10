import type { Metadata } from "next";
import { LandingHeader } from "@/app/_components/LandingHeader";
import { FaqSection } from "@/app/_components/FaqSection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about the Cookbooks CLI registry.",
};

export default function FaqPage() {
  return (
    <div className="cb-root">
      <LandingHeader />
      <div style={{ paddingTop: "52px" }}>
        <FaqSection />
      </div>
    </div>
  );
}
