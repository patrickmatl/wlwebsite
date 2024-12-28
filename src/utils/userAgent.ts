const searchEngineUserAgents = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'yahoo',
  'slurp',
  'teoma',
  'msnbot',
  'crawler'
];

export function isSearchEngine(userAgent: string | null): boolean {
  if (!userAgent) return false;
  
  const lowerCaseUA = userAgent.toLowerCase();
  return searchEngineUserAgents.some(bot => lowerCaseUA.includes(bot));
}
