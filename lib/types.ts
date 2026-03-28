export interface Course {
  id: string;
  title: string;
  description: string;
  plan_type: 'Basic' | 'Standard' | 'Premium';
  price: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
}

export interface Video {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: number;
  order_index: number;
  created_at: string;
}

export interface Testimonial {
  review: string;
  id: string;
  name: string;
  client_image: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  
}

export interface Transformation {
  id: string;
  client_name: string;
  before_image: string;
  after_image: string;
  description: string;
  duration_weeks: number;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  course_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  purchased_at: string;
  payment_id: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
}

export interface VideoProgress {
  id: string;
  user_id: string;
  video_id: string;
  completed: boolean;
  last_position: number;
  updated_at: string;
}
