export interface Coupon {
  id: string;
  code: string;
  amount: number;
  created_at: string;
  availed_on?: string;
  user_id?: string;
  revoked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}