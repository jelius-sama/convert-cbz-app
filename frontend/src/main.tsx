import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/main.css'
import Homepage from "@/pages/home"
import { HeroUIProvider } from '@heroui/react'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <HeroUIProvider>
            <main className="dark text-foreground bg-background p-2 min-w-screen min-h-screen box-border">
                <Homepage />
            </main>
        </HeroUIProvider>
    </React.StrictMode>
)
