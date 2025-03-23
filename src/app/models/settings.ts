export type Settings = SettingsDto;

export interface SettingsDto {
  statisticsColumns: {
    showTotalPackets: boolean;
    showPacketsPerSec: boolean;
    showTotalBytes: boolean;
    showBytesPerSec: boolean;
  };
  statisticsRowsAndCharts: {
    showETH: boolean;
    showIPv4: boolean;
    showIPv6: boolean;
    showTCP: boolean;
  };
  statisticsIR: {
    showMinValue: boolean;
    showMaxValue: boolean;
    showCurrentValue: boolean;
  };
}
