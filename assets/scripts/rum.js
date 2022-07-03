let metrics = {
  'transactionId': Date.now().toString(36) + Math.random().toString(36).substring(2),
  'origin':window.location.origin,
  'pathname':window.location.pathname,
  'deviceMemory':navigator.deviceMemory,
  'hardwareConcurrency':navigator.hardwareConcurrency,
  'connection':{
      effectiveType: navigator.connection.effectiveType,
      rtt: navigator.connection.rtt,
      downlink: navigator.connection.downlink,
  },
  'userAgent':navigator.userAgent,
  'language':navigator.language,
  'entries': performance.getEntries()
}

// for FID, LCP, TTFB
function saveMetric(metric) { 
  metrics[metric.name] = metric.value
  console.log('RUM: metric '+metric.name+' exist.')

  if (metric.name=='TTFB') {
    sendToAnalytics(metrics)
  }
  if ((metrics.FID !== undefined) && (metrics.LCP !== undefined)) {
    let lastMetrics = {
      'transactionId': metrics.transactionId,
      'FID': metrics.FID,
      'LCP': metrics.LCP
    }
    sendToAnalytics(lastMetrics)
  }
}

function sendToAnalytics(metrics) {
  // Replace with whatever serialization method you prefer.
  // Note: JSON.stringify will likely include more data than you need.
  const body = JSON.stringify(metrics)
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  fetch('https://battle.canarytrace.com', {body, method: 'POST', keepalive: true})
}