import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle, ChangeEvent } from 'react';
import { Table, Pagination, Container, Form, Row, Col, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import { adService } from '../services/addService';
import { authService } from '../services/authService';
import { AdDetails } from '../types/AdDetails';
import AddAdModal from './AddAdModal';
import { colors } from '@mui/material';

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

interface AdsTableProps {
    userName: string;  // Korisničko ime trenutno prijavljenog korisnika
    onAdAdded?: () => void;  // Callback funkcija koja se poziva kada se doda novi oglas
    onAdUpdated?: () => void;  // Callback funkcija koja se poziva kada se ažurira oglas
    onAdDeleted?: () => void;  // Callback funkcija koja se poziva kada se obriše oglas
    showFilters?: boolean;  // Da li da prikaže filtere
    showAddButton?: boolean;  // Da li da prikaže dugme za dodavanje novog oglasa
    showEditButton?: boolean;  // Da li da prikaže dugme za izmenu oglasa
    showDeleteButton?: boolean;  // Da li da prikaže dugme za brisanje oglasa
    showPagination?: boolean;  // Da li da prikaže paginaciju
    itemsPerPage?: number;  // Broj oglasa po strani
    sortBy?: string;  // Polje po kojem se sortira
    sortDirection?: 'asc' | 'desc';  // Smer sortiranja
    initialFilters?: {  // Početne vrednosti filtera
        category?: string;
        name?: string;
        minPrice?: string;
        maxPrice?: string;
        city?: string;
        showMineOnly?: boolean;
    };
}

const AdsTable = forwardRef<{ refreshAds: () => void }, AdsTableProps>(({ userName = '' }, ref) => {
    const [ads, setAds] = useState<AdDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedAd, setSelectedAd] = useState<AdDetails | null>(null);
    const [showAddAdModal, setShowAddAdModal] = useState(false);
    const [adToEdit, setAdToEdit] = useState<AdDetails | null>(null);
    const [filters, setFilters] = useState({
        category: '',
        name: '',
        minPrice: '',
        maxPrice: '',
        city: '',
        showMineOnly: false
    });

    const fetchAds = useCallback(async () => {
        try {
            setLoading(true);
            const response = await adService.getAdsWithFilters(currentPage, 10, filters);
            setAds(response.content);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            console.error('Error fetching ads:', err);
            setError('Error fetching ads');
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    useImperativeHandle(ref, () => ({
        refreshAds: fetchAds
    }));

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    const handleDeleteAd = async (id: string) => {
        try {
            await adService.deleteAd(id);
            setSelectedAd(null);
            fetchAds();
        } catch (err) {
            console.error('Error deleting ad:', err);
            setError('Error deleting ad');
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFilters(prev => ({
                ...prev,
                [name]: checked
            }));
            return;
        }

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
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
    };

    if (loading) {
        return <div className="text-center mt-4"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }

    return (
        <Container className="mt-4">
            {/* Filteri */}
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
                                type="text"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                placeholder="Min price"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Form.Group>
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                placeholder="Max price"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} className="mb-3">
                        <Form.Group className="mt-4">
                            <br/>
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

            {/* Tabela */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center">No ads found</td>
                        </tr>
                    ) : (
                        ads.map((ad) => (
                            <tr 
                                key={ad.id} 
                                onClick={() => setSelectedAd(ad)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    {ad.imageUrl ? (
                                        <img 
                                            src={ad.imageUrl} 
                                            alt={ad.name}
                                            style={{ 
                                                width: '100px', 
                                                height: '100px', 
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ) : (
                                        <div 
                                            style={{ 
                                                width: '100px', 
                                                height: '100px', 
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td>{ad.name}</td>
                                <td>${ad.price.toFixed(2)}</td>
                                <td>{ad.category.toUpperCase()}</td>
                                <td>{ad.city}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Modal za prikaz detalja oglasa */}
            <Modal show={!!selectedAd} onHide={() => setSelectedAd(null)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAd?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAd && (
                        <>
                            <div className="text-center mb-4">
                                {selectedAd.imageUrl ? (
                                    <img 
                                        src={selectedAd.imageUrl} 
                                        alt={selectedAd.name}
                                        style={{ 
                                            maxWidth: '100%', 
                                            maxHeight: '400px', 
                                            objectFit: 'contain' 
                                        }}
                                    />
                                ) : (
                                    <div 
                                        style={{ 
                                            width: '100%', 
                                            height: '200px', 
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        No Image
                                    </div>
                                )}
                            </div>
                            <p><strong>Description:</strong> {selectedAd.description}</p>
                            <p><strong>Price:</strong> ${selectedAd.price.toFixed(2)}</p>
                            <p><strong>Category:</strong> {selectedAd.category.toUpperCase()}</p>
                            <p><strong>City:</strong> {selectedAd.city}</p>
                            <p><strong>Posted by:</strong> {selectedAd.username}</p>
                            <p><strong>Posted at:</strong> {new Date(selectedAd.createdAt).toLocaleString()}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="secondary" onClick={() => setSelectedAd(null)}>
                            Close
                        </Button>
                        {userName && selectedAd && userName === selectedAd.username && (
                            <div>
                                <Button 
                                    variant="primary" 
                                    className="me-2"
                                    onClick={() => {
                                        setAdToEdit(selectedAd);
                                        setSelectedAd(null);
                                        setShowAddAdModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this ad?')) {
                                            handleDeleteAd(selectedAd.id);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Modal za dodavanje/izmenu oglasa */}
            <AddAdModal
                show={showAddAdModal}
                onHide={() => {
                    setShowAddAdModal(false);
                    setAdToEdit(null);
                }}
                onAdAdded={fetchAds}
                editMode={!!adToEdit}
                adToEdit={adToEdit}
            />
        </Container>
    );
});

export default AdsTable; 