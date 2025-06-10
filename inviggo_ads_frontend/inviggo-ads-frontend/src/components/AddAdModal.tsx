import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { adService } from '../services/addService';
import { authService } from '../services/authService';

interface AddAdModalProps {
    show: boolean;
    onHide: () => void;
    onAdAdded: () => void;
}

const AddAdModal: React.FC<AddAdModalProps> = ({ show, onHide, onAdAdded }) => {
    const [adData, setAdData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: '',
        category: 'TECHNOLOGY',
        city: ''
    });
    const [error, setError] = useState<string | null>(null);

    const categories = [
        'CLOTHING', 'TOOLS', 'SPORTS', 'ACCESSORIES', 
        'FURNITURE', 'PETS', 'GAMES', 'BOOKS', 'TECHNOLOGY'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        const token = authService.getToken();
        if (!token) {
            setError('You must be logged in to create an ad');
            return;
        }

        try {
            const adDataToSend = {
                ...adData,
                price: parseFloat(adData.price)
            };
            
            const response = await adService.createAd(adDataToSend);
            console.log('Ad created:', response);
            onHide();
            onAdAdded();
            setAdData({
                name: '',
                description: '',
                imageUrl: '',
                price: '',
                category: 'TECHNOLOGY',
                city: ''
            });
        } catch (error: any) {
            console.error('Error creating ad:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
            } else {
                setError(error.response?.data?.message || 'Error creating ad. Please try again.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAdData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Ad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={adData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={adData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="imageUrl"
                            value={adData.imageUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={adData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={adData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={adData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Create Ad
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAdModal; 