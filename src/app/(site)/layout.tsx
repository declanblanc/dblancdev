import '@/styles/globals.css'
import SiteHeader from '@/components/Layout/SiteHeader'
import SiteFooter from '@/components/Layout/SiteFooter'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="container">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
