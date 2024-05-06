'use client'
import Invoke from "./components/invoke"
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

export default  withPageAuthRequired( function Home() {
  const {user} = useUser();
  return (
    <>
    <Invoke user={user?.email} />
    </>
  );
})
