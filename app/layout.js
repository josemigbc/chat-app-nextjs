import './globals.css'

export const metadata = {
  title: 'ChatApp',
  description: 'ChatApp instant messaging',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="py-20">
        {children}
      </body>
    </html>
  )
}