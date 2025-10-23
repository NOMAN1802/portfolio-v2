import React from 'react'

const layout = ({children}) => {
  return (
    <div className='relative flex flex-col h-screen'>{children}</div>
  )
}

export default layout;