/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "1024px",
                xl: "1200px",
                "2xl": "1366px",
            },

            colors: {
                headingColor: "#2e2e2e",
                textColor: "#515151",
                primary: "#f3f3f3",
                darkOverlay: "rgba(0,0,0,0.2)",
                lightOverlay: "rgba(255,255,255,0.4)",
                lightTextGray: "#9ca0ab",
                card: "rgba(256,256,256,0.8)",
                cartBg: "#282a2c",
                cartItem: "#2e3033",
                cartTotal: "#343739",
            },
        },
    },
    plugins: [],
}

