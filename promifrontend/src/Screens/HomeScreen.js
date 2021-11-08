import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../Actions/userAction'

const HomeScreen = ({ history }) => {
    const dispatch = useDispatch();
    const usersReducer = useSelector(state => state.usersReducer)
    const { currentUser } = usersReducer

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserData(() => {
                console.log('Got user data')
            }));
        }
    }, [currentUser, history, dispatch])
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}


export default HomeScreen;
