"use client";

import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      {/* Estospaces Text */}
      <span className="text-[#FF7700] font-semibold text-xl">
        Estospaces
      </span>
    </div>
  );
};

export default Logo;
