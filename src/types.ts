export type ScreenType = 'discover' | 'explore' | 'service-detail' | 'checkout' | 'bookings' | 'pass' | 'talk-to-us' | 'skin-analysis';

export interface PaymentMethodItem {
  id: string;
  type: 'apple_pay' | 'card' | 'atome';
  name: string;
  last4?: string;
  brand?: 'visa' | 'mastercard' | 'amex';
  expiry?: string;
  isRemovable?: boolean;
}

export interface SkinProfileResult {
  skinType: string;
  concerns: string[];
  lifestyle: string[];
  healthScore: number;
  primaryDiagnosis: string;
  amRoutine: string[];
  pmRoutine: string[];
  activeIngredients: string[];
  recommendedTreatmentIds: string[];
}

export interface Treatment {
  id: string;
  title: string;
  subtitle: string;
  atelier: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  durationMins: number;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  badge?: string;
  badgeType?: 'default' | 'gold' | 'plum' | 'green';
  description: string;
  availableToday?: boolean;
  slots: string[];
  instantConfirm?: boolean;
  highDemand?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  atelier: string;
  avatar: string;
  roleType: 'Lead' | 'Senior' | 'Master';
  experienceYears: number;
  status: 'online' | 'busy' | 'available_later';
  slotTime: string;
  rating: number;
}

export interface AddOnItem {
  id: string;
  name: string;
  durationMins: number;
  price: number;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
}

export interface BookingRecord {
  id: string;
  serviceTitle: string;
  atelier: string;
  specialistName: string;
  specialistAvatar: string;
  date: string;
  time: string;
  durationMins: number;
  totalPaid: number;
  status: 'Confirmed' | 'Completed' | 'Pending';
  addOns: string[];
  qrCode?: string;
}
