export type DashboardStatistics = DashboardStatisticsDto;

export interface ProtocolStatistics {
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
  total_time: string;
  protocols: ProtocolStatistics[];
  information_rate: InformationRate;
}

export function dtoToDashboardStatistics(dto: any): DashboardStatistics {
  return {
    total_time: dto['total-time'],
    protocols: dto.protocols.map((protocol: any) => ({
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

export function dashboardStatisticsToDto(
  dashboardStatistics: DashboardStatistics
): any {
  return {
    'total-time': dashboardStatistics.total_time,
    protocols: dashboardStatistics.protocols.map(protocol => ({
      name: protocol.name,
      'total-packets': protocol.total_packets,
      'total-bytes': protocol.total_bytes,
    })),
    'information-rate': {
      min: dashboardStatistics.information_rate.min,
      max: dashboardStatistics.information_rate.max,
      current: dashboardStatistics.information_rate.current,
    },
  };
}
