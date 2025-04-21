import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUserRequest, editUserSuccess, editUserFailure } from '../redux/actions';

const EditUserForm = ({ user, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: { name: user.company?.name || '' }
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(editUserRequest());
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: user.id })
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(editUserSuccess({ ...data, ...formData, id: user.id }));
                    onClose();
                })
                .catch(error => dispatch(editUserFailure(error.message)));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'companyName') {
            setFormData({ ...formData, company: { name: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <h2 className="form-title">Edit User</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="companyName"
                    value={formData.company.name}
                    onChange={handleChange}
                    placeholder="Company Name"
                />
            </div>
            <div className="card-actions">
                <button className="button" onClick={handleSubmit}>
                    Save
                </button>
                <button className="card-button delete" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditUserForm;