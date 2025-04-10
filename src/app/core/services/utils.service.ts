import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  getNextDateForDay(dayOfWeek: string): Date {
    const daysOfWeek: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };
  
    if (!(dayOfWeek in daysOfWeek)) {
      throw new Error("Invalid day name provided");
    }
  
    const today = new Date();
    const todayDay = today.getDay(); 
    const targetDay = daysOfWeek[dayOfWeek];
  
    let daysUntilTarget = targetDay - todayDay;
    if (daysUntilTarget <= 0) {
      daysUntilTarget += 7;
    }
  
    const nextTargetDate = new Date();
    nextTargetDate.setDate(today.getDate() + daysUntilTarget);
  
    return nextTargetDate;
  }
}
