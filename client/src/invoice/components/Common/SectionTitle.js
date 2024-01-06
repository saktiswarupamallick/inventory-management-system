import React, { useMemo } from "react";

function SectionTitle({ children, className }) {
  const classes = useMemo(() => {
    const defaultClassName = "font-bold text-lg font-title";

    if (className) {
      return defaultClassName + " " + className;
    }

    return defaultClassName;
  }, [className]);

  return <div style={{color:"black"}} className={classes}>{children}</div>;
}

export default SectionTitle;
