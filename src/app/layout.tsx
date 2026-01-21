// import type { Metadata } from "next";
// import { Outfit, Poppins } from "next/font/google";
// import "./globals.css";
// import { QueryProvider } from "@/components/providers/QueryProvider";
// import { ThemeProvider } from "@/components/providers/ThemeProvider";
// import { Toaster } from "@/components/ui/sonner";

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-outfit",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "SuprDM - Instagram DM Automation",
//   description: "Automate your Instagram DMs and grow your business",
//   openGraph: {
//     images: ["/opengraph.jpg"],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${outfit.variable} ${poppins.variable} font-sans`}>
//         <QueryProvider>
//           <ThemeProvider>
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SuprDM - Instagram DM Automation",
  description: "Automate your Instagram DMs and grow your business",
  openGraph: {
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${outfit.variable} 
          ${poppins.variable} 
          font-sans 
          bg-white 
          text-black
          relative
          overflow-visible
        `}
      >
        <QueryProvider>
          <ThemeProvider>
            <div className="relative min-h-screen z-10">
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
