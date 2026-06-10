import { useEffect, useState } from "react";

function DriverNotifications({ darkMode }) {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {

        setNotifications(
          data.notifications
        );

      }

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const updateStatus = async (
    id,
    action
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/notifications/${action}/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      if (data.success) {

        fetchNotifications();

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          paddingTop: "150px",
          textAlign: "center",
          color:
            darkMode
              ? "white"
              : "#0f172a",
        }}
      >
        Loading notifications...
      </div>

    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "140px 60px",
        background:
          darkMode
            ? "linear-gradient(to bottom right,#020617,#050816)"
            : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "50px",
        }}
      >

        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          DRIVER DASHBOARD
        </p>

        <h1
          style={{
            color:
              darkMode
                ? "white"
                : "#0f172a",
            fontSize: "52px",
          }}
        >
          Ride Requests
        </h1>

      </div>

      {
        notifications.length === 0 ?

          (

            <div
              style={{
                padding: "40px",
                borderRadius: "30px",
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <h2
                style={{
                  color:
                    darkMode
                      ? "white"
                      : "#0f172a",
                }}
              >
                No requests found
              </h2>

            </div>

          )

          :

          (

            notifications.map(
              (notification) => (

                <div
                  key={
                    notification._id
                  }
                  style={{
                    padding: "30px",
                    marginBottom: "25px",
                    borderRadius: "28px",
                    background:
                      "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    backdropFilter:
                      "blur(20px)",
                  }}
                >

                  {/* Rider */}

                  <h2
                    style={{
                      color:
                        darkMode
                          ? "white"
                          : "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    {
                      notification
                        .riderId?.name
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Phone :
                    {" "}
                    {
                      notification
                        .riderId?.phone
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Driver Route :
                    {" "}
                    {
                      notification
                        .rideId?.from
                    }
                    {" → "}
                    {
                      notification
                        .rideId?.to
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Pickup :
                    {" "}
                    {
                      notification
                        .bookingId
                        ?.pickupPoint
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Drop :
                    {" "}
                    {
                      notification
                        .bookingId
                        ?.dropPoint
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Seats :
                    {" "}
                    {
                      notification
                        .bookingId
                        ?.seatsBooked
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#3b82f6",
                      fontWeight:
                        "600",
                      marginBottom:
                        "20px",
                    }}
                  >
                    ₹
                    {
                      notification
                        .bookingId
                        ?.amount
                    }
                  </p>

                  <div>

                    <span
                      style={{
                        padding:
                          "8px 16px",
                        borderRadius:
                          "999px",

                        background:

                          notification.status ===
                          "pending"

                            ?

                            "rgba(59,130,246,0.15)"

                            :

                            notification.status ===
                            "accepted"

                            ?

                            "rgba(34,197,94,0.15)"

                            :

                            "rgba(239,68,68,0.15)",

                        color:

                          notification.status ===
                          "pending"

                            ?

                            "#3b82f6"

                            :

                            notification.status ===
                            "accepted"

                            ?

                            "#22c55e"

                            :

                            "#ef4444",
                      }}
                    >

                      {
                        notification
                          .status
                      }

                    </span>

                  </div>

                  {

                    notification.status ===
                    "pending"

                    &&

                    (

                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "18px",
                          marginTop:
                            "25px",
                        }}
                      >

                        <button
                          onClick={() =>
                            updateStatus(
                              notification._id,
                              "accept"
                            )
                          }
                          style={{
                            padding:
                              "14px 24px",
                            border:
                              "none",
                            borderRadius:
                              "16px",
                            background:
                              "#22c55e",
                            color:
                              "white",
                            cursor:
                              "pointer",
                            fontWeight:
                              "600",
                          }}
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              notification._id,
                              "reject"
                            )
                          }
                          style={{
                            padding:
                              "14px 24px",
                            border:
                              "none",
                            borderRadius:
                              "16px",
                            background:
                              "#ef4444",
                            color:
                              "white",
                            cursor:
                              "pointer",
                            fontWeight:
                              "600",
                          }}
                        >
                          Reject
                        </button>

                      </div>

                    )

                  }

                </div>

              )
            )

          )

      }

    </div>

  );

}

export default DriverNotifications;