import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { adService } from '../services/addService';
import { authService } from '../services/authService';
import { AdDetails } from '../types/AdDetails';

interface AddAdModalProps {
    show: boolean;
    onHide: () => void;
    onAdAdded: () => void;
    editMode?: boolean;
    adToEdit?: AdDetails | null;
}

const AddAdModal: React.FC<AddAdModalProps> = ({ 
    show, 
    onHide, 
    onAdAdded,
    editMode = false,
    adToEdit = null 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        city: '',
        imageUrl: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'CLOTHING', 'TOOLS', 'SPORTS', 'ACCESSORIES', 
        'FURNITURE', 'PETS', 'GAMES', 'BOOKS', 'TECHNOLOGY'
    ];

    useEffect(() => {
        if (editMode && adToEdit) {
            setFormData({
                name: adToEdit.name,
                description: adToEdit.description,
                imageUrl: adToEdit.imageUrl || '',
                price: adToEdit.price.toString(),
                category: adToEdit.category,
                city: adToEdit.city
            });
        }
    }, [editMode, adToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (!authService.isAuthenticated()) {
                throw new Error('You must be logged in to create/edit an ad');
            }

            const adData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editMode && adToEdit) {
                await adService.updateAd(adToEdit.id, adData);
            } else {
                await adService.createAd(adData);
            }

            onAdAdded();
            onHide();
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                city: '',
                imageUrl: ''
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit Ad' : 'Add New Ad'}</Modal.Title>
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
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
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
                            value={formData.category}
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
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {editMode ? 'Save Changes' : 'Create Ad'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAdModal; 