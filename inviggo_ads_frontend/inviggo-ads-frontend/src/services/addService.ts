import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:8081/api';

// Interface for creating a new ad
interface AdCreateDTO {
    name: string;
    description: string;
    imageUrl?: string;
    price: number;
    category: string;
    city: string;
}

// Interface for the ad response
interface AdResponse {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    price: number;
    category: string;
    city: string;
    createdAt: string;
    username: string;
}

// Interface for paginated response
interface PaginatedResponse {
    content: AdResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

interface CreateAdResponse {
    ad: AdResponse;
}

interface Filters {
    category?: string;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    showMineOnly: boolean;
}

const CATEGORIES = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Toys',
    'Books',
    'Other'
];

class AdService {
    // Get all ads with pagination
    async getAllAds(page: number = 0, size: number = 20): Promise<PaginatedResponse> {
        try {
            const response = await axios.get(`${API_URL}/ads`, {
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching ads:', error);
            throw error;
        }
    }

    // Get a single ad by ID
    async getAdById(id: string): Promise<AdResponse> {
        try {
            const response = await axios.get(`${API_URL}/ads/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ad with id ${id}:`, error);
            throw error;
        }
    }

    // Create a new ad
    async createAd(adData: any): Promise<AdResponse> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.post<AdResponse>(`${API_URL}/ads`, adData, { headers });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                authService.logout();
            }
            throw error;
        }
    }

    // Delete an ad
    async deleteAd(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            await axios.delete(`${API_URL}/ads/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(`Error deleting ad with id ${id}:`, error);
            throw error;
        }
    }

    // Update an ad
    async updateAd(id: string, adData: Partial<AdCreateDTO>): Promise<AdResponse> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.put(`${API_URL}/ads/${id}`, adData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating ad with id ${id}:`, error);
            throw error;
        }
    }

    async getAds(
        page: number = 0, 
        size: number = 20,
        filters?: {
            category?: string;
            name?: string;
            minPrice?: number;
            maxPrice?: number;
            showMineOnly?: boolean;
        }
    ): Promise<PaginatedResponse> {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString()
            });

            if (filters) {
                if (filters.category) params.append('category', filters.category);
                if (filters.name) params.append('name', filters.name);
                if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
                if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
                if (filters.showMineOnly) params.append('showMineOnly', 'true');
            }

            const response = await axios.get<PaginatedResponse>(`${API_URL}/ads?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching ads:', error);
            throw error;
        }
    }
}

export const adService = new AdService();
