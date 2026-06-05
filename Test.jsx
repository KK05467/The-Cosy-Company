import { useEffect } from "react";
import axios from "axios";

function Test() {
  useEffect(() => {
    const test = async () => {
        console.log(localStorage.getItem("token"));
        console.log({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SUCCESS:", res.data);
      } catch (err) {
        console.log("ERROR:", err.response?.data);
      }
    };

    test();
  }, []);

  return <h1>Testing...</h1>;
}

export default Test;