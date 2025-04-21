import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserRequest, deleteUserSuccess, deleteUserFailure } from '../redux/actions';
import EditUserForm from './EditUserForm';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        dispatch(deleteUserRequest());
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteUserSuccess(user.id));
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => dispatch(deleteUserFailure(error.message)));
    };

    return (
        <div className="card">
            {isEditing ? (
                <EditUserForm user={user} onClose={() => setIsEditing(false)} />
            ) : (
                <>
                    <h3 className="card-title">{user.name}</h3>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.phone}</p>
                    <p className="card-text">{user.company?.name}</p>
                    <div className="card-actions">
                        <button
                            className="card-button edit"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="card-button delete"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserCard;