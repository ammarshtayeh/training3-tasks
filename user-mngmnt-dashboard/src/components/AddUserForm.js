import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserRequest, addUserSuccess, addUserFailure } from '../redux/actions';

const AddUserForm = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: { name: '' }
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        else if (users.some(user => user.email.toLowerCase() === formData.email.toLowerCase())) {
            newErrors.email = 'Email already exists'; 
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addUserRequest());
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(addUserSuccess({ ...data, ...formData }));
                    setFormData({ name: '', email: '', phone: '', company: { name: '' } });
                    setErrors({}); 
                })
                .catch(error => dispatch(addUserFailure(error.message)));
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
        <div className="form-container">
            <h2 className="form-title">Add New User</h2>
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
            <button className="button" onClick={handleSubmit}>
                Add User
            </button>
        </div>
    );
};

export default AddUserForm;