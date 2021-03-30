import React, { useEffect } from "react";
import NashRamp from "nash-ramp-widget";

const NashRampWidget = ({ env, destination, target, base }) => {
  useEffect(() => {
    const nash = new NashRamp({
      env,
      destination,
      target,
      base,
    });
    nash.init({
      width: 496,
      height: 480,
    });
  }, []);
  return <div data-nash-fiat-ramp-widget />;
};

export default NashRampWidget;
