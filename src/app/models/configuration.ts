export interface Configuration {
  id: string;
  name: string;
  is_applied: boolean;
  mac_source: string[];
  mac_destination: string[];
  frame_ranges: [number, number][];
  protocols: string[];
}

export interface ConfigurationDto {
  id: string;
  name: string;
  is_applied: boolean;
  source_mac: string[];
  destination_mac: string[];
  frame_ranges: [number, number][];
  protocols: string[];
}

export function dtoToConfiguration(dto: ConfigurationDto): Configuration {
  return {
    ...dto,
    mac_source: dto.source_mac,
    mac_destination: dto.destination_mac,
  };
}

export function configurationToDto(
  configuration: Configuration
): ConfigurationDto {
  return {
    ...configuration,
    source_mac: configuration.mac_source,
    destination_mac: configuration.mac_destination,
  };
}
