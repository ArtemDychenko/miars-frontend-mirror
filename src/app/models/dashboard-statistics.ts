export interface ProtocolStatistics {
  name: string;
  total_packets: number;
  total_bytes: number;
}

export interface ProtocolStatisticsDto {
  name: string;
  total_packets: number;
  total_bytes: number;
}

export interface InformationRate {
  min: number;
  max: number;
  current: number;
}

export interface DashboardStatisticsDto {
  total_time: number;
  protocols: ProtocolStatisticsDto[];
  information_rate: InformationRate;
}

export interface DashboardStatistics {
  total_time: Date;
  protocols: ProtocolStatistics[];
  information_rate: InformationRate;
}

export function dtoToDashboardStatistics(
  dto: DashboardStatisticsDto
): DashboardStatistics {
  return {
    total_time: new Date(dto.total_time * 1000),
    protocols: dto.protocols.map((protocol: ProtocolStatisticsDto) => ({
      name: protocol.name,
      total_packets: protocol.total_packets,
      total_bytes: protocol.total_bytes,
    })),
    information_rate: {
      min: dto.information_rate.min,
      max: dto.information_rate.max,
      current: dto.information_rate.current,
    },
  };
}
