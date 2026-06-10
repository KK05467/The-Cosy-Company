import { useEffect, useState } from "react";

function DriverMyRides({ darkMode }) {

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/rides/my-rides",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setRides(data.rides);

      }

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const startRide = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/rides/start/${id}`,
        {
          method: "PATCH",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchRides();

    }

    catch (error) {

      console.log(error);

    }

  };

  const completeRide = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/rides/complete/${id}`,
        {
          method: "PATCH",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchRides();

    }

    catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (
      <div
        style={{
          padding: "150px",
          color:
            darkMode
              ? "white"
              : "#0f172a"
        }}
      >
        Loading...
      </div>
    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "140px 50px",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)"
      }}
    >

      <h1
        style={{
          color:
            darkMode
              ? "white"
              : "#0f172a",
          marginBottom: "40px"
        }}
      >
        My Rides
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px"
        }}
      >

        {rides.map((ride) => (

          <div
            key={ride._id}
            style={{
              padding: "30px",
              borderRadius: "25px",
              background:
                "rgba(255,255,255,.04)",
              border:
                "1px solid rgba(255,255,255,.08)"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "25px"
              }}
            >

              <div>

                <h2
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#0f172a"
                  }}
                >
                  {ride.from}
                  {" → "}
                  {ride.to}
                </h2>

                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  {ride.vehicleName}
                </p>

              </div>

              <span
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",

                  background:
                    ride.rideStatus === "scheduled"
                      ? "rgba(59,130,246,.15)"
                      : ride.rideStatus === "started"
                      ? "rgba(249,115,22,.15)"
                      : ride.rideStatus === "completed"
                      ? "rgba(34,197,94,.15)"
                      : "rgba(239,68,68,.15)",

                  color:
                    ride.rideStatus === "scheduled"
                      ? "#3b82f6"
                      : ride.rideStatus === "started"
                      ? "#f97316"
                      : ride.rideStatus === "completed"
                      ? "#22c55e"
                      : "#ef4444"
                }}
              >
                {ride.rideStatus}
              </span>

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "25px"
              }}
            >

              <div>

                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  Date
                </p>

                <h4
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#0f172a"
                  }}
                >
                  {ride.departureDate}
                </h4>

              </div>

              <div>

                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  Time
                </p>

                <h4
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#0f172a"
                  }}
                >
                  {ride.departureTime}
                </h4>

              </div>

              <div>

                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  Seats
                </p>

                <h4
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#0f172a"
                  }}
                >
                  {ride.availableSeats}
                </h4>

              </div>

              <div>

                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  Fare
                </p>

                <h4
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#0f172a"
                  }}
                >
                  ₹{ride.fixedFare}
                </h4>

              </div>

            </div>

            {ride.rideStatus ===
              "scheduled" && (

              <button
                onClick={() =>
                  startRide(ride._id)
                }
                style={{
                  padding: "14px 22px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Start Ride
              </button>

            )}

            {ride.rideStatus ===
              "started" && (

              <button
                onClick={() =>
                  completeRide(
                    ride._id
                  )
                }
                style={{
                  padding: "14px 22px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "#16a34a",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Complete Ride
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default DriverMyRides;