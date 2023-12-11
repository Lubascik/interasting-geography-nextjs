import "./global-style.sass";

import React, { useLayoutEffect } from "react";

const _app = ({ Component, pageProps }) => {
  useLayoutEffect(()=>{
    screen.orientation.lock("landscape");
  })
  return <Component {...pageProps} />;
};

export default _app;
