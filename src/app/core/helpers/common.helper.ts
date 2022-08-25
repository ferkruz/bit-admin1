import { right } from "@popperjs/core";

export class CommonHelper {

  public static convertDurationToSeconds(duration: string): number {
    let arr = duration.split(':');
    return (+arr[0]) * 60 * 60 + (+arr[1]) * 60 + (+arr[2]);
  }

  public static convertSecondsToHHmmss(seconds: number) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    let hDisplay: string = h > 0 ? ('0' + h).slice(-2) : '00';
    let mDisplay: string = m > 0 ? ('0' + m).slice(-2) : '00';
    let sDisplay: string = s > 0 ? ('0' + s).slice(-2) : '00';
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}
}
