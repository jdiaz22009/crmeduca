import type {Metadata} from 'next';

import SideBar from '@/components/sidebar/sidebar';
import {AuthContextProvider} from '@/context/authContext';

export const metadata: Metadata = {
  title: 'Admin Dasboard',
  description: 'Generated by create next app',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div className="flex">
          <SideBar />

          <main className="w-full text-slate-900">
            <AuthContextProvider>{children}</AuthContextProvider>
          </main>
        </div>
      </div>
    </div>
  );
}
