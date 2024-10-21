import React from 'react'
import LoginPage from './login/page';
import RegisterPage from './register/page';

const page = () => {
  return (
    <div className='container p-24 m-8'>
        <LoginPage/>
        <RegisterPage/>
    </div>
  )
}

export default page;