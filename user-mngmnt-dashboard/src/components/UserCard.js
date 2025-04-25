import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserRequest, deleteUserSuccess, deleteUserFailure } from '../redux/actions';
import EditUserForm from './EditUserForm';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDelete = () => {
        setShowConfirmDelete(true); // Show the custom modal
    };

    const confirmDelete = () => {
        setShowConfirmDelete(false); // Close the modal
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

    const cancelDelete = () => {
        setShowConfirmDelete(false); // Close the modal without deleting
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

            {}
            {showConfirmDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3 className="modal-title">Confirm Delete</h3>
                        <p className="modal-message">
                            Are you sure you want to delete {user.name}?
                        </p>
                        <div className="modal-actions">
                            <button className="card-button delete" onClick={confirmDelete}>
                                Yes, Delete
                            </button>
                            <button className="card-button edit" onClick={cancelDelete}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;