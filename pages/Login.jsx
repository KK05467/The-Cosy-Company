import AuthLeft from "../components/AuthLeft"
import LoginForm from "../components/LoginForm"

function Login() {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <AuthLeft />
      <LoginForm />

    </div>

  )
}

export default Login