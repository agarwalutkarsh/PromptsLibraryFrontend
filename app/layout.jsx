import MainContextWrapper from '@/components/ContextApi/MainContext'
import Nav from '@/components/Nav'
import '@/styles/globals.css' // This will apply the css to all the pages

export const metadata = {
  title: 'Next.js',
  description: 'Next Js 14 Project - Fullstack',
}

const RootLayout = ({ children }) => { // this is the root layout which is a wrapper for every page
  return (
    <html lang="en">
      <body className='font-inter'>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          {/* Navbar which will be applied to every page */}
          <MainContextWrapper>
            <Nav />
            {children}
          </MainContextWrapper>
        </main>
      </body>
    </html>
  )
}

export default RootLayout