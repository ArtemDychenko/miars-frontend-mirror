export type Settings = SettingsDto;

export interface SettingsDto {
  showTotalPackets: boolean;
  showPacketsPerSec: boolean;
  showTotalBytes: boolean;
  showBytesPerSec: boolean;

  showETH: boolean;
  showIPv4: boolean;
  showIPv6: boolean;
  showTCP: boolean;

  showMinValue: boolean;
  showMaxValue: boolean;
  showCurrentValue: boolean;
}
