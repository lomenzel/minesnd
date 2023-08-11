import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondsToTime'
})
export class MillisecondsToTimePipe implements PipeTransform {

  transform(ms:number): string {
    if (ms < 0) {
      return '0:00:00';
    }

    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  }

}
