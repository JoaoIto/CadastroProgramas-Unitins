import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Software Hub',
    description: 'Software hub para programas de computadores da Universidade!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className={`w-screen h-screen flex items-center justify-center`}>
                    {children}
                </main>
            </body>
        </html>
    )
}
