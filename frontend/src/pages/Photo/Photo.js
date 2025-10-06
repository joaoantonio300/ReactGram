import './Photo.css';

import {uploads} from "../../utils/config";

// components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';

// hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getPhoto } from '../../slices/photoSlice';

const Photo = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth)
    const {photo, loading, error, message} = useSelector((state) => state.photo);

    // comments

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Like and comments

    if(loading) {
        return <p>Carregando</p>
    }

return (
    <div>Photo</div>
  )
}

export default Photo