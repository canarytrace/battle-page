import { sleep } from 'k6'
import configuration from './config/default.js'
const credentials = { user: __ENV.USER, pass: __ENV.PASS,}
const config = configuration(credentials, __ENV.ENVIRONMENT, __ENV.TRACE_ID)

// snippets
import {openHomepage, items} from './fragments/homePage.js'

export let options = {
  scenarios: {
    homePageScenario: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '120s', target: 200 },
        { duration: '120s', target: 300 },
        { duration: '120s', target: 400 },
        { duration: '120s', target: 500 }
      ],
      gracefulRampDown: '0s',
      tags: { scenario: 'homePage' },
      exec: 'homePageScenario',
    },
    api: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '120s', target: 70 },
        { duration: '120s', target: 70 },
        { duration: '120s', target: 100 },
        { duration: '120s', target: 100 }
      ],
      gracefulRampDown: '0s',
      tags: { scenario: 'api' },
      exec: 'api',
    }
  },
  //batchPerHost: 6,
  thresholds: { 
    http_req_failed: ['rate<10'],
    http_req_duration: ['p(90)<3000'], // 90% of requests should be below 400ms
    'group_duration{group:::BattlePage open}': ['p(95)<3000'], // 95% of login transactions should be below 2s
    'checks{validation:BattlePage open}': ['rate>0.95'],
    'checks{validation:Items}': ['rate>0.95']
  }
}

export function setup() {}

export function homePageScenario() {
  openHomepage(config)

  sleep(Math.random() * 10)
}

export function api() {
  items(config)
}