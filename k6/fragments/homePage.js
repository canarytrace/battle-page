import { check, group, fail } from 'k6'
import { Rate } from 'k6/metrics'
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';

const successHomePageRate = new Rate('success_homepage_rate');
const unSuccessHomePageRate = new Rate('unsuccess_homepage_rate');
const successItemsRate = new Rate('success_items_rate');
const unSuccessItemsRate = new Rate('unsuccess_items_rate');

let response

const openHomepage = function(config = fail(`login: missing config.`)) {
  const { environment, traceId } = config
  const session = new Httpx({
    baseURL: environment,
    headers: {
      'x-b3-traceid': traceId
    },
    timeout: 2000,
  })

  group('BattlePage open', function () {
    response = session.get(
      '/',
      {
        headers: {
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    check(response, {
      '1-openHomepage: response code was 200': (res) => res.status == 200,
    })
    let successOpen = check(response, {
      '1-openHomepage: page contains title': (res) => res.body.includes(`BattlePage`)
    })
    if (successOpen) successHomePageRate.add(successOpen)
    if (!successOpen) unSuccessHomePageRate.add(successOpen)

  })
}

const items = function(config = fail(`login: missing config.`)) {
  const { environment, traceId } = config
  const session = new Httpx({
    baseURL: environment,
    headers: {
      'x-b3-traceid': traceId
    },
    timeout: 2000,
  })

  group('MainJS', function () {
    response = session.get(
      '/src/main.js',
      {
        headers: {
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    check(response, {
      '2-items: response code was 200': (res) => res.status == 200,
    })
    let successOpen = check(response, {
      '2-items: page contains images': (res) => res.body.includes(`main script start`)
    })

  })

  group('Items', function () {
    response = session.get(
      ':3000/items',
      {
        headers: {
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    check(response, {
      '2-items: response code was 200': (res) => res.status == 200,
    })
    let successOpen = check(response, {
      '2-items: page contains images': (res) => res.body.includes(`madmonq_amumu_wallpaper.jpg`)
    })
    if (successOpen) successItemsRate.add(successOpen)
    if (!successOpen) unSuccessItemsRate.add(successOpen)

  })
}

module.exports = {
  openHomepage,
  items
}