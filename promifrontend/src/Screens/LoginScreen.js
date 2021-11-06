import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Actions/userAction'

const LoginScreen = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, currentUser } = userLogin

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, [currentUser, history])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        history.push('/');
    }
    return (
        <Container>
            <Row className='justify-content-md-center py-5'>
                <Col xs={12} md={6}>
                    <h1>Login </h1>
                    {error && <h1>{error}</h1>}
                    {loading ? (<h1>Loading...</h1>) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='dark' className='mt-3'>
                                Sign In
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>

        </Container>
    )
}

export default LoginScreen
