import { getTokenIcon, TOKEN_ICON_FALLBACK } from "@common";
import { styled } from "@mui/material";
import React from "react";

interface TokenAvatarProps {
  token: string;
  size?: number;
}

export const TokenAvatar = React.memo(
  ({ token, size = 24 }: TokenAvatarProps) => {
    if (!token) return null;
    return (
      <TokenAvatarStyled size={size}>
        <img
          key={token}
          src={getTokenIcon(token)}
          alt={token}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </TokenAvatarStyled>
    );
  },
);

const TokenAvatarStyled = styled("div")<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${TOKEN_ICON_FALLBACK})`,
  position: "relative",
  "& img": {
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    width: size,
    height: size,
  },
}));

interface TokenOptionProps extends React.HTMLAttributes<HTMLLIElement> {
  option: string;
}
export const TokenOption = React.memo(
  ({ option, ...props }: TokenOptionProps) => (
    <li
      {...props}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <TokenAvatar token={option} size={24} />
      {option}
    </li>
  ),
);
