export type Settings = SettingsDto;

export interface SettingsDto {
  statisticsColumns: {
    showTotalPackets: true;
    showPacketsPerSec: true;
    showTotalBytes: true;
    showBytesPerSec: true;
  };
  statisticsRowsAndCharts: {
    showETH: true;
    showIPv4: true;
    showIPv6: true;
    showTCP: true;
  };
  statisticsIR: {
    showMinValue: true;
    showMaxValue: true;
    showCurrentValue: true;
  };
}

export function dtoToSettings(dto: SettingsDto): Settings {
  return dto;
}

export function settingsToDto(settings: Settings): SettingsDto {
  return settings;
}
