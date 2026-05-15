import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import SplashScreen from "../pages/Splashscreen"
import Home from "../pages/Home"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"


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
        <div
          key = "home"
          style = {{
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #020617, #050816)",
            overflow: "hidden",
            fontFamily: "Inter, sans-serif",
          }}
        >

          <Navbar/>
          <Hero/>
        </div>
        
      )}
    </AnimatePresence>
  )
}

export default App