type Metric = import('web-vitals').Metric

type PerformanceData = { pageUrl: string; } & Pick<Metric, 'name' | 'rating' | 'value' | 'navigationType'>
