import "./globals.css";
import { geistSans, geistMono, niconne, poppins } from '@/fonts/fonts'
import UserPageWrap from "@/components/UserPageWrap/UserPageWrap";
import { metadataObj } from '@/metadata/metadata'
import { ViewTransitions } from "next-view-transitions";

const metaObj = await metadataObj('en')
export const metadata = {
  ...metaObj,
  title: {
    template: '%s | Romina Peruchin',
    default: 'Romina Peruchin'
  }
}

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
            ${geistSans.variable}
            ${geistMono.variable}
            ${niconne.variable}
            ${poppins.variable}
            max-w-screen overflow-x-hidden
          `}
        >

        <UserPageWrap>
          {children}
        </UserPageWrap>

        </body>
      </html>
    </ViewTransitions>
  );
}
