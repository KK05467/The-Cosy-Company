import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import Features from "../components/Features"
import Testimonial from "../components/Testimonial"

function Home({ darkMode, setDarkMode }) {

  return (

    <div>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero darkMode={darkMode} />

      <Stats darkMode={darkMode} />

      <Features darkMode={darkMode} />

      <Testimonial darkMode={darkMode} />

    </div>

  )
}

export default Home