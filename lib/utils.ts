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
    };
  
    return date.toLocaleString("en-GB", options);
  };
  
export const formatPrice = (price: number | null ): string | null => {
  if (!price) {
    return null;
  }

  return `£${price.toFixed(2)}`;
};

export const truncateDescription = (
  description: string | null ,
  maxLength: number = 20
): string | null => {
  if (!description) {
    return null;
  }

  return description.length <= maxLength
    ? description
    : `${description.slice(0, maxLength).trim()}...`;
};

export function capitaliseFirstWord(str: string): string {
  if (!str) return "";
  const words = str.split(" ");

  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  return words.join(" ");
}

