export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#0B2A59",
          80: "#CFF0FF",
          40: "#ECF9FF",
          20: "#F5FCFF",
          12: "#F9FDFF",
        },
        neutral: {
          100: "#101010",
          80: "#404040",
          40: "#9F9F9F",
          20: "#CFCFCF",
          12: "#E2E2E2",
          0: "#FFFFFF",
        },
        success: {
          100: "#3AC858",
          80: "#61D379",
          40: "#B0E9BC",
          20: "#D8F4DE",
          12: "#E7F8EB",
        },
        info: {
          100: "#00B6D6",
          80: "#33C5DE",
          40: "#99E2EF",
          20: "#CCF0F7",
          12: "#E0F6FA",
        },
        warning: {
          100: "#FFAF12",
          80: "#FFBF41",
          40: "#FFDFA0",
          20: "#FFEFD0",
          12: "#FFF5E2",
        },
        danger: {
          100: "#FF4C5F",
          80: "#FF707F",
          40: "#FFB7BF",
          20: "#FFDBDF",
          12: "#FFE9EC",
        },
      },
    },
  },
  plugins: [],
};
