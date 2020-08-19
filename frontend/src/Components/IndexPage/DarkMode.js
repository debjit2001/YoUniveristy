import React, { useState } from "react";
import "./DarkMode.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
  background-color : ${(props) =>
    props.theme.mode === "dark" ? "#111" : "#EEE"};
  color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};

}`;

function DarkMode() {
  const [theme, setTheme] = useState({ mode: "light" });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <label className="switch">
        <input
          checked={theme.mode === "dark"}
          onChange={(e) =>
            setTheme(
              theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
            )
          }
          type="checkbox"
          className="checkbox"
          id="checkbox"
        />

        <span className="slider round"></span>
      </label>
    </ThemeProvider>
  );
}

export default DarkMode;
