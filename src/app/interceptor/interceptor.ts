import * as framesCurrent from './mocks/frames-current.json';
import * as framesHistorical from './mocks/frames-historical.json';
import * as irCurrent from './mocks/ir-current.json';
import * as irHistorical from './mocks/ir-historical.json';
import * as ipv4Current from './mocks/ipv4-current.json';
import * as ipv4Historical from './mocks/ipv4-historical.json';
import * as dashboardStats from './mocks/dashboard-statistics.json';
import * as dashboardStats2 from './mocks/dashboard-statistics-2.json';

export const urls = [
  {
    url: '/api/statistics/frames/current',
    json: () => framesCurrent,
  },
  {
    url: '/api/statistics/frames/historical',
    json: () => framesHistorical,
  },
  {
    url: '/api/statistics/information-rate/current',
    json: () => irCurrent,
  },
  {
    url: '/api/statistics/information-rate/historical',
    json: () => irHistorical,
  },
  {
    url: '/api/statistics/IPv4/current',
    json: () => ipv4Current,
  },
  {
    url: '/api/statistics/IPv4/historical',
    json: () => ipv4Historical,
  },
  {
    url: '/api/statistics',
    json: () => (Math.random() < 0.5 ? dashboardStats2 : dashboardStats),
  },
];
