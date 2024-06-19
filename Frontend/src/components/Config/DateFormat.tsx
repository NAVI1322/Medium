export function DateFormat(date: string): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' , year:'numeric'};
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  
  export function getTimeDifference(createdAtString:string) {
    const createdAtDate = new Date(createdAtString);
    const currentTime = Date.now();
    const timeDifference = currentTime - createdAtDate.getTime();
  
    // Calculate time difference in various units
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    // Format the time difference into a string
    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return `${secondsDifference} seconds ago`;
    }
  }
  
  
  
