import NextLink, { LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkProps = NextLinkProps & {
  children: ReactNode;
  external?: false;
};

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  external: true;
};

const Link = ({ children, ...props }: LinkProps | AnchorProps) =>
  props.external ? (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <NextLink {...props}>{children}</NextLink>
  );

export { Link };
