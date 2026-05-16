import AuthLeft from "../components/AuthLeft"
import LoginForm from "../components/LoginForm"

import { useNavigate } from "react-router-dom"

function Login({ darkMode }) {

  const navigate = useNavigate()

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <AuthLeft darkMode={darkMode} />

      <LoginForm
        darkMode={darkMode}
        navigate={navigate}
      />

    </div>

  )
}

export default Login