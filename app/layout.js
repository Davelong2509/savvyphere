import "./globals.css";
import RouteTransition from "@/components/RouteTransition";

export const metadata = {
  title: {
    default: "SavvySphere | Property guidance, thoughtfully considered",
    template: "%s | SavvySphere"
  },
  description:
    "Thoughtful property guidance, informed decisions and a clearer way forward with SavvySphere.",
  applicationName: "SavvySphere",
  openGraph: {
    title: "SavvySphere | Property guidance, thoughtfully considered",
    description:
      "Thoughtful property guidance, informed decisions and a clearer way forward.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><RouteTransition>{children}</RouteTransition></body>
    </html>
  );
}