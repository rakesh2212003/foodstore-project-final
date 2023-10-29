import React from 'react'

import { DBLeftSection, DBRightSection } from '../components'

const Dashboard = () => {
    return (
        <main className='w-screen h-screen flex items-center bg-primary'>
            <DBLeftSection />
            <DBRightSection />
        </main>
    )
}

export default Dashboard