import React from 'react'

import { DBHeader } from '../components'

const DBRightSection = () => {
    return (
        <div className='flex flex-col px-8 py-8 flex-1 h-full'>
            <DBHeader />

            <div className='flex flex-col flex-1 overflow-y-scroll scrollbar'>

            </div>
        </div>
    )
}

export default DBRightSection