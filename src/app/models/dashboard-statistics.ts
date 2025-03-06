export interface ProtocolStatistics {
  name: string;
  total_packets: number;
  total_bytes: number;
}

export interface ProtocolStatisticsDto {
  name: string;
  'total-packets': number;
  'total-bytes': number;
}

export interface InformationRate {
  min: number;
  max: number;
  current: number;
}

export interface DashboardStatisticsDto {
  'total-time': number;
  protocols: ProtocolStatisticsDto[];
  'information-rate': InformationRate;
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
    total_time: new Date(dto['total-time'] * 1000),
    protocols: dto.protocols.map((protocol: ProtocolStatisticsDto) => ({
      name: protocol.name,
      total_packets: protocol['total-packets'],
      total_bytes: protocol['total-bytes'],
    })),
    information_rate: {
      min: dto['information-rate'].min,
      max: dto['information-rate'].max,
      current: dto['information-rate'].current,
    },
  };
}
