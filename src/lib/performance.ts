/**
 * Performance Monitoring Utilities
 * @module performance
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

function rateMetric(name: keyof typeof THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = THRESHOLDS[name];
  if (!t) return 'good';
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

/** Collects Web Vitals metrics using Performance Observer API */
export function collectWebVitals(onMetric: (m: PerformanceMetric) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  try {
    new PerformanceObserver((list) => {
      const e = list.getEntries();
      const last = e[e.length - 1];
      if (last) onMetric({ name: 'LCP', value: last.startTime, rating: rateMetric('LCP', last.startTime), timestamp: Date.now() });
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (e.name === 'first-contentful-paint')
        onMetric({ name: 'FCP', value: e.startTime, rating: rateMetric('FCP', e.startTime), timestamp: Date.now() });
    }).observe({ type: 'paint', buffered: true });
  } catch {}
}

/** Debounce: delays fn execution until delay ms after last call */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let id: ReturnType<typeof setTimeout>;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), delay); };
}

/** Throttle: executes fn at most once per limit ms */
export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit = 100): (...args: Parameters<T>) => void {
  let t = false;
  return (...args) => { if (!t) { fn(...args); t = true; setTimeout(() => { t = false; }, limit); } };
}

/** Preloads critical resources */
export function preloadResource(url: string, as: string): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${url}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'preload'; link.href = url; link.as = as;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}
