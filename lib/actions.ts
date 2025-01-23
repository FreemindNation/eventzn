function validateEventData(event: {
    isFree: boolean;
    ticketPrice?: number | null;
    startTime: Date;
    endTime: Date;
  }): void {
    if (event.isFree && event.ticketPrice !== null) {
      throw new Error("Ticket price must be null if the event is free.");
    }
  
    if (new Date(event.startTime) >= new Date(event.endTime)) {
      throw new Error("Start time must be before end time.");
    }
  }
  