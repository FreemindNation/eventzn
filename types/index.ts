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

export interface FormattedEvent {
  id: string,
  title: string;
  description: string ;
  startTime: Date;
  endTime: Date;
  location: string;
  category: string;
  isFree: boolean,
  ticketPrice: number;
  createdAt: Date;
  imageUrl?: string;
  createdBy: string;
}

export interface EventData {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  imageUrl?: string;
  isFree: boolean;
  ticketPrice?: number;
  createdBy: string;
}