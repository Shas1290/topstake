import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import './globals.css'; // Ensure your basic resets are here

export const metadata = {
  title: 'Next.js Premium Stack',
  description: 'Powered by GSAP, Lenis, and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}