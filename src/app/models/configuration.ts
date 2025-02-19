export type Configuration = ConfigurationDto;

export interface ConfigurationDto {
  id: string;
  name: string;
  is_applied: boolean;
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
