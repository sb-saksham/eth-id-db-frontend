import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '../../context/AuthContext';
import { Formik } from "formik";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const LoginForm = props => {
    const { signIn } = useAuthContext();
    return (
        <Formik
            initialValues={{email: null, password: null}}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = "This Field is Required!";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = "Invalid Email Address";
                }
                if (!values.password) {
                    errors.password = "This Field is Required!";
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try { await signIn(values); }
                catch (e) {
                    console.log(er.data?.response)
                }
                resetForm();
                setSubmitting(false);
            }}
        >{({ handleChange, handleBlur, touched, errors, handleSubmit, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
            <FloatingLabel
                controlId='floatingLoginemail'
                label="Email"
                className='mb-3'
            >
                <Form.Control
                    type="text"
                    name="email"
                    placeholder='any@email.com'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                    />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingLoginPassword'
                className='mb-3'
                label="Password"
            >
                
                <Form.Control
                    type="password"
                    name="password"
                    placeholder='*********'
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}        
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type='submit' className='my-4' disabled={isSubmitting}>
                Log In
            </Button>
            </Form>      
    )}
        </Formik>
    );
}

export default LoginForm;