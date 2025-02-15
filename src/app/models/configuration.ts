import { FrameRange } from './frame-range';
import { Protocol } from './protocol';

export type Configuration = ConfigurationDto;

export interface ConfigurationDto {
  mac_source: string[];
  mac_destination: string[];
  frame_range: FrameRange[];
  protocol: Protocol[];
}

export function dtoToConfiguration(dto: ConfigurationDto): Configuration {
  return dto;
}

export function configurationToDto(
  configuration: Configuration
): ConfigurationDto {
  return configuration;
}
