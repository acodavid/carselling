import React from 'react';
import { Link } from 'react-router-dom';

export default function PostRegister() {
    return (
        <div className="container">
            <div className="alert alert-dismissible alert-success">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>You have successfully registered!</strong> Welcome to our site!
            </div>
            <Link to="/login" className="btn btn-primary btn-block">Please log in to proceed</Link>
        </div>

    )
}
