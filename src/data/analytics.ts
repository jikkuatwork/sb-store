import type { AppUsage, TimeSeriesData } from '../types/analytics';

export const sampleUsage: AppUsage[] = [
  {
    id: '1',
    organisation_id: 'org1',
    organisation_name: 'Acme Corp',
    app_id: 'app1',
    app_name: 'Stable Diffusion XL',
    total_requests: 15000,
    successful_requests: 14500,
    failed_requests: 500,
    total_credits: 75000,
    date: '2024-03-15'
  },
  {
    id: '2',
    organisation_id: 'org2',
    organisation_name: 'TechStart Inc',
    app_id: 'app2',
    app_name: 'Whisper Large v3',
    total_requests: 25000,
    successful_requests: 24000,
    failed_requests: 1000,
    total_credits: 25000,
    date: '2024-03-15'
  }
];

// Generate realistic daily usage data for November
export const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const november = new Date(2023, 10); // Month is 0-based, so 10 is November
  const daysInNovember = new Date(2023, 11, 0).getDate();

  for (let day = 1; day <= daysInNovember; day++) {
    const date = new Date(2023, 10, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Base requests between 1000-2000 with more variation
    let baseRequests = isWeekend
      ? 1000 + Math.random() * 500  // Lower on weekends
      : 1200 + Math.random() * 800; // Higher on weekdays
    
    // Add some weekly patterns
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 2 || dayOfWeek === 3) { // Higher on Tuesday/Wednesday
      baseRequests *= 1.2;
    }
    
    // Add some monthly patterns
    if (day > 10 && day < 20) { // Mid-month peak
      baseRequests *= 1.15;
    }
    
    // Round to whole numbers
    const requests = Math.round(baseRequests);
    
    // Credits are typically 3-5x the requests
    const creditMultiplier = 3 + Math.random() * 2;
    const credits = Math.round(requests * creditMultiplier);

    data.push({
      date: date.toISOString().split('T')[0],
      requests,
      credits
    });
  }

  return data;
};