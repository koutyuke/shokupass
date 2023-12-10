import { FC } from "react";

type Props = { children: React.ReactNode; className: string };

const Code: FC<Props> = ({ children, className }) => <code className={className}>{children}</code>;

export { Code };
