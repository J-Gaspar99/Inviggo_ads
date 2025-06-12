import axios from 'axios';
import { authService } from './authService';
import { AdDetails } from '../types/AdDetails';
import { Ad } from '../types/Ad';

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

interface CreateAdRequest {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    city: string;
}

interface Filters {
    category?: string;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    showMineOnly: boolean;
}

interface FilterParams {
    category?: string;
    name?: string;
    minPrice?: string;
    maxPrice?: string;
    city?: string;
    showMineOnly?: boolean;
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
    async getAllAds(page: number, size: number) {
        try {
            const response = await axios.get(`${API_URL}/ads`, {
                params: {
                    page,
                    size
                }
            });
            console.log('API Response:', response.data); // Dodajemo logging
            return response.data;
        } catch (error) {
            console.error('Error in getAllAds:', error);
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
    async createAd(ad: CreateAdRequest) {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.post(`${API_URL}/ads`, ad, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    // Delete an ad
    async deleteAd(id: string) {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.delete(`${API_URL}/ads/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    // Update an ad
    async updateAd(id: string, ad: CreateAdRequest) {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.put(`${API_URL}/ads/${id}`, ad, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
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

    async getAdDetails(id: string) {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${API_URL}/ads/${id}/details`, { headers });
            return response.data;
        } catch (error) {
            console.error('Error fetching ad details:', error);
            throw error;
        }
    }

    async getAdsWithFilters(page: number, size: number, filters: FilterParams) {
        const params = {
            page,
            size,
            ...filters
        };

        const response = await axios.get(`${API_URL}/ads`, { params });
        return response.data;
    }
}

export const adService = new AdService();
