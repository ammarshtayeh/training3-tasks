import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './redux/actions';
import UserCard from './components/UserCard';
import AddUserForm from './components/AddUserForm';
import './index.css';

const App = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchUsersRequest());
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => dispatch(fetchUsersSuccess(data)))
            .catch(error => dispatch(fetchUsersFailure(error.message)));
    }, [dispatch]);

    return (
        <div className="container">
            <h1 className="heading">User Management Dashboard</h1>
            <AddUserForm />
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="grid">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default App;