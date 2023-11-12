import React from 'react'

import { Header, Home } from '../components'

const Main = () => {
    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
            <Header />

            <div className='w-full flex flex-col items-start justify-center mt-20 px-6 gap-10 pb-24'>
                <Home />
            </div>
        </main>
    )
}

export default Main