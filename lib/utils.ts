export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error occurred:", error);
  }
}


export const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
  
    return date.toLocaleString("en-GB", options);
  };
  
export const formatPrice = (price: number ): string  => {
  // if (!price) {
  //   return null;
  // }

  return `£${price.toFixed(2)}`;
};

export const truncateDescription = (
  description: string ,
  maxLength: number = 100
): string => {
  // if (!description) {
  //   return null;
  // }

  return description.length <= maxLength
    ? description
    : `${description.slice(0, maxLength).trim()}...`;
};
