export function generateCouponCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const segments = Array.from({ length: 3 }, () => 
    Array.from({ length: 3 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  );
  return `sb-${segments.join('-')}`;
}