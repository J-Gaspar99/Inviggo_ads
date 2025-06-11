import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { adService } from '../services/addService';
import { authService } from '../services/authService';

interface Ad {
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

interface PaginatedResponse {
    content: Ad[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

const CATEGORIES = [
    'CLOTHING',
    'TOOLS',
    'SPORTS',
    'ACCESSORIES',
    'FURNITURE',
    'PETS',
    'GAMES',
    'BOOKS',
    'TECHNOLOGY'
];

const AdsTable: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]); // Will hold the current page's ads
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Total pages from backend
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const currentUser = authService.getCurrentUser(); // Get current user

    // Filter states
    const [filters, setFilters] = useState({
        category: '',
        name: '',
        minPrice: '',
        maxPrice: '',
        city: '',
        showMineOnly: false
    });

    // Local states for price inputs to maintain focus while typing
    const [minPriceInput, setMinPriceInput] = useState(filters.minPrice);
    const [maxPriceInput, setMaxPriceInput] = useState(filters.maxPrice);

    const fetchAds = async (page: number) => {
        try {
            setLoading(true);
            const response = await adService.getAds(page, 20, {
                category: filters.category || undefined,
                name: filters.name || undefined,
                minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
                showMineOnly: filters.showMineOnly
            });
            setAds(response.content);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            setError('Failed to fetch ads. Please try again later.');
            console.error('Error fetching ads:', err);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch ads from the backend when page or filters change
    useEffect(() => {
        fetchAds(currentPage);
    }, [currentPage, filters]); 

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (name === 'minPrice') {
            setMinPriceInput(value);
        } else if (name === 'maxPrice') {
            setMaxPriceInput(value);
        } else {
            setFilters(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            }));
            setCurrentPage(0); // Reset to first page for non-price filters
        }
    };

    const handlePriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setCurrentPage(0); // Reset to first page when price filter is applied
    };

    const handleResetFilters = () => {
        setFilters({
            category: '',
            name: '',
            minPrice: '',
            maxPrice: '',
            city: '',
            showMineOnly: false
        });
        setMinPriceInput(''); // Reset local price input states
        setMaxPriceInput(''); // Reset local price input states
        setCurrentPage(0); // Reset to first page when filters are cleared
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <Container className="mt-4">
            <h2>All Ads</h2>
            
            {/* Filters Section */}
            <div className="mb-4 p-3 border rounded">
                <h4>Filters</h4>
                <Row>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>Search by Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                                placeholder="Search ads..."
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>Min Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="minPrice"
                                value={minPriceInput}
                                onChange={handleFilterChange}
                                onBlur={handlePriceBlur}
                                placeholder="Min price"
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxPrice"
                                value={maxPriceInput}
                                onChange={handleFilterChange}
                                onBlur={handlePriceBlur}
                                placeholder="Max price"
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                placeholder="Enter city"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Form.Group className="mt-4">
                            <Form.Check
                                type="checkbox"
                                name="showMineOnly"
                                label="Show only my ads"
                                checked={filters.showMineOnly}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Button 
                            variant="secondary" 
                            onClick={handleResetFilters}
                            className="mt-4"
                        >
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>City</th>
                        <th>Posted By</th>
                        <th>Posted At</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                        <tr key={ad.id}>
                            <td>{ad.name}</td>
                            <td>{ad.description}</td>
                            <td>${ad.price.toFixed(2)}</td>
                            <td>{ad.category.toUpperCase()}</td>
                            <td>{ad.city}</td>
                            <td>{ad.username}</td>
                            <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                <Pagination.First 
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                />
                <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index === currentPage}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                />
                <Pagination.Last 
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                />
            </Pagination>
        </Container>
    );
};

export default AdsTable; 