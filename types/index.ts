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

export type EventFormState = {
  error: string;
  validationErrors: {
    title?: string[];
    description?: string[];
    startTime?: string[];
    endTime?: string[];
    location?: string[];
    category?: string[];
    isFree?: string[];
    ticketPrice?: string[];
    createdBy?: string[];
    imageUrl?: string[];
  };
  success?: boolean;
};
