import axios from "axios";
import { useEffect } from "react";

useEffect(() => {
  axios.get(
    "http://localhost:5000/api/auth/profile",
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("PROFILE:", res.data);
  })
  .catch((err) => {
    console.log("ERROR:", err.response?.data);
  });
}, []);