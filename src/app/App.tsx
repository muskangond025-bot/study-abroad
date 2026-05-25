import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Loader } from './components/Loader';
import { useState, useEffect } from 'react';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    // Fail-safe to ensure the loader is always unmounted after a maximum of 3.2 seconds,
    // protecting the user experience against animation freeze or HMR timing resets.
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <RouterProvider router={router} />
    </>
  );
}