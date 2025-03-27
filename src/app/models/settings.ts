export interface Settings {
  showTotalPackets: boolean;
  showPacketsPerSec: boolean;
  showTotalBytes: boolean;
  showBytesPerSec: boolean;

  showETH: boolean;
  protocols: { [key: string]: boolean };

  showMinValue: boolean;
  showMaxValue: boolean;
  showCurrentValue: boolean;
}
