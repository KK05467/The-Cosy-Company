import {motion} from "framer-motion"
function SplashScreen() {

  return (
    <motion.div
      initial = {{ opacity : 1}}
      exit = {{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
      }}
      trasition = {{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      style = {{
        height: "100vh",
        width: "100%",
        background: 
            "linear-gradient(to bottom right, #050816, #0f172a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        zIndex: 999,
        overflow: "hidden",
      }}
    >

     {/* Glow Effect */}
     <motion.div
        aniamte = {{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
        }}
        transition = {{
            duration: 3,
            repeat: Infinity,
        }}
        style = {{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#2563eb",
            filter: "blur(140px)",
            opacity: 0.4,
        }}

        />

        {/* Logo Content */}
        <motion.div
        initial = {{
            opacity : 0,
            y: 40,
        }}
        animate = {{
            opacity: 1,
            y: 0,
        }}
        transition = {{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        }}
        style = {{
            textAlign: "center", 
            position: "relative",
            zIndex: 2,
        }}
        >
            <motion.h1
                animate = {{
                    letterSpacing: ["0px", "2px", "0px"],
                }}
                transition = {{
                    duration: 4,
                    repeat: Infinity,
                }}
                style = {{
                    color: "white",
                    fontSize: "82px",
                    fontWeight: "700",
                    margin: 0,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                Cosy
            </motion.h1>

            <motion.p
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            transition = {{
                delay : 0.4,
                duration : 1,
            }}
            style = {{
                color: "#60a5fa",
                letterSpacing: "12px",
                marginTop: "18px",
                fontSize: "13px",
                fontWeight: "500",
            }}
            >
                TRAVEL TOGETHER
            </motion.p>

        </motion.div>
    

    </motion.div>
  )
}

export default SplashScreen