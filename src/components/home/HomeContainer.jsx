import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './Home';
import Loader from '../layouts/Loader';
import { getData } from '../../share/domain/appServices';

export default function HomeContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData())
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <Home />
            }
        </>
    )
}
