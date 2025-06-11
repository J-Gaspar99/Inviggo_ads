import { User } from './User';
import { AdCategory } from './AdCategory';

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: AdCategory;
  location: string;
  contactInfo: string;
  createdAt: string;
  user: User;
} 