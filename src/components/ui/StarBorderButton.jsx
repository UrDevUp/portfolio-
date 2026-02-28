import React from "react";
import { cn } from "../../lib/utils";

const StarBorderButton = React.forwardRef(function StarBorderButton(
  {
    as: Component = "button",
    className,
    color = "#d8b4fe",
    speed = "6s",
    thickness = 2,
    children,
    style,
    type,
    ...props
  },
  ref,
) {
  const speedValue = typeof speed === "number" ? `${speed}s` : speed;
  const thicknessValue =
    typeof thickness === "number" ? `${thickness}px` : thickness;

  const componentProps = {
    ...props,
    ref,
    className: cn("star-border-button", className),
    style: {
      "--star-color": color,
      "--star-speed": speedValue,
      "--star-thickness": thicknessValue,
      ...style,
    },
  };

  if (Component === "button") {
    componentProps.type = type || "button";
  }

  return (
    <Component {...componentProps}>
      <span className="star-border-button__content">{children}</span>
    </Component>
  );
});

export default StarBorderButton;
