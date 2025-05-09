'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'jotai';
import { usePathname } from 'next/navigation';
import { Navbar, Sidebar } from '@/components/layout';
import { NextAuthProvider } from '@/lib/next-auth';
import './globals.scss';

const DynamicStyledComponentsProvider = dynamic(
  () => import('@/lib/styledComponents').then((mod) => mod.default),
  { ssr: false },
);

const AntConfigProvider = dynamic(
  () => import('@/lib/antd/index').then((mod) => mod.default),
  { ssr: false },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicPaths = ['/auth'];
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

  return (
    <html lang="mn" suppressHydrationWarning>
      <body id="app">
        <Provider>
          <NextAuthProvider>
            <AntConfigProvider>
              <DynamicStyledComponentsProvider>
                {!isPublicPage ? (
                  <div className="flex bg-secondary">
                    <Sidebar />
                    <div className="flex flex-1 flex-col">
                      <Navbar />
                      <div className="flex size-full flex-col p-3xl">
                        {children}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-secondary">{children}</div>
                )}
              </DynamicStyledComponentsProvider>
            </AntConfigProvider>
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
