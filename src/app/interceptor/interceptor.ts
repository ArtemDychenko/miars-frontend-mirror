import * as configurationList from './mocks/configurations.json';
import * as configuration1 from './mocks/configuration-1.json';
import * as configuration2 from './mocks/configuration-2.json';
import * as dashboardStats from './mocks/dashboard-statistics.json';

export const urls = [
  {
    url: '/api/v1/configuration/1abc',
    json: configuration1,
  },
  {
    url: '/api/v1/configuration/2def',
    json: configuration2,
  },
  {
    url: '/api/v1/configuration',
    json: configurationList,
  },
  {
    url: '/api/statistics',
    json: dashboardStats,
  },
];
