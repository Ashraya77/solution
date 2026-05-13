import LoginForm from '@/presentation/components/auth/LoginForm'
import React from 'react'
import { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <LoginForm/>
      </Suspense>
    </div>
  )
}

export default page
