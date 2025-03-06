import * as configurationList from './mocks/configurations.json';
import * as configuration1 from './mocks/configuration-1.json';
import * as configuration2 from './mocks/configuration-2.json';
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
    url: '/api/configuration/1abc',
    json: () => configuration1,
  },
  {
    url: '/api/configuration/2def',
    json: () => configuration2,
  },
  {
    url: '/api/configuration',
    json: () => configurationList,
  },
  {
    url: '/api/statistics/frames/current',
    json: () => framesCurrent,
  },
  {
    url: '/api/statistics/frames/historical',
    json: () => framesHistorical,
  },
  {
    url: '/api/statistics/ir/current',
    json: () => irCurrent,
  },
  {
    url: '/api/statistics/ir/historical',
    json: () => irHistorical,
  },
  {
    url: '/api/statistics/ipv4/current',
    json: () => ipv4Current,
  },
  {
    url: '/api/statistics/ipv4/historical',
    json: () => ipv4Historical,
  },
  {
    url: '/api/statistics',
    json: () => (Math.random() < 0.5 ? dashboardStats2 : dashboardStats),
  },
];
