import { useEffect, useState } from "react"

export default function OtpTimer({ expiryTime }) {
  const [timeLeft, setTimeLeft] = useState(expiryTime - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiryTime - Date.now()
      setTimeLeft(diff > 0 ? diff : 0)

      if (diff <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [expiryTime])

  const format = (ms) => {
    const min = Math.floor(ms / 60000)
    const sec = Math.floor((ms % 60000) / 1000)
    return `${min}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <p style={{ color: "#3b82f6", fontSize: "13px" }}>
      OTP valid for: {format(timeLeft)}
    </p>
  )
}
