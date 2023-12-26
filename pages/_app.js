import "../styles/global-style.sass";

import React, { useEffect } from "react";

const _app = ({ Component, pageProps }) => {
  useEffect(() => {
    if ("onorientationchange" in window) {
      screen.orientation.lock("landscape");
    }
  });
  return (
      <Component {...pageProps} />
  );
};

export default _app;
