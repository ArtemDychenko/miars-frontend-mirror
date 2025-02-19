export type Configuration = ConfigurationDto;

export interface ConfigurationDto {
  mac_source: string[];
  mac_destination: string[];
  frame_range: [number, number][];
  protocol: string[];
}

export function dtoToConfiguration(dto: ConfigurationDto): Configuration {
  return dto;
}

export function configurationToDto(
  configuration: Configuration
): ConfigurationDto {
  return configuration;
}

// @todo: delete
export const configurationMock: Configuration = {
  mac_source: [
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
    '01:23:45:67:89:ab',
  ],
  mac_destination: ['fe:dc:ba:98:76:54'],
  frame_range: [
    [0, 63],
    [128, 255],
    [1024, 1518],
  ],
  protocol: ['IPv4', 'IP6', 'UDP'],
};
