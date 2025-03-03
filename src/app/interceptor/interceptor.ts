import * as configurationList from './mocks/configurations.json';
import * as configuration1 from './mocks/configuration-1.json';
import * as configuration2 from './mocks/configuration-2.json';
import * as framesCurrent from './mocks/frames-current.json';
import * as framesHistorical from './mocks/frames-historical.json';
import * as irCurrent from './mocks/ir-current.json';
import * as irHistorical from './mocks/ir-historical.json';
import * as ipv4Current from './mocks/ipv4-current.json';
import * as ipv4Historical from './mocks/ipv4-historical.json';

export const urls = [
  {
    url: '/configurations/1abc',
    json: configuration1,
  },
  {
    url: '/configurations/2def',
    json: configuration2,
  },
  {
    url: '/configurations',
    json: configurationList,
  },
  {
    url: '/statistics/frames/current',
    json: framesCurrent,
  },
  {
    url: '/statistics/frames/historical',
    json: framesHistorical,
  },
  {
    url: '/statistics/ir/current',
    json: irCurrent,
  },
  {
    url: '/statistics/ir/historical',
    json: irHistorical,
  },
  {
    url: '/statistics/ipv4/current',
    json: ipv4Current,
  },
  {
    url: '/statistics/ipv4/historical',
    json: ipv4Historical,
  },
];
