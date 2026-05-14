import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import SplashScreen from "../pages/Splashscreen"
import Home from "../pages/Home"

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)

  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <SplashScreen key="splash" />
      ) : (
        <Home key="home" />
      )}
    </AnimatePresence>
  )
}

export default App