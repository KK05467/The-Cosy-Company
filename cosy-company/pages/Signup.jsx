import AuthLeft from "../components/AuthLeft"
import SignupForm from "../components/SignupForm"

function Signup({ darkMode }) {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <AuthLeft darkMode={darkMode} />

      <SignupForm darkMode={darkMode} />

    </div>

  )
}

export default Signup