import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SignUpActionState = {
  name?: string;
  email?: string;
  password?: string;
  redirectPath?: string;
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
};

export type SignInState = {
  error: string | null;
  submitted: boolean;
  user?: { 
    email: string;
    password: string;
  };
};