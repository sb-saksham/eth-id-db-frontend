import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useAuthContext } from '../../context/AuthContext';
import { useAccount } from 'wagmi';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import {toast} from 'react-toastify'
const SignUpForm = props => {
    const { signUp } = useAuthContext();
    const { address: walletAddress } = useAccount();
    console.log(walletAddress);
    return (
        <Formik
            initialValues={{
                password:  null,
                password2: null,
                fullname: null,
                email: null,
                eth_walllet_address: walletAddress === undefined ? null : walletAddress,
            }}
            initialErrors={{
                eth_walllet_address: walletAddress === undefined,
            }}
            validate={(values) => {
                const errors = {};
                if (!values.fullname) {
                    errors.fullname = "Full Name is Required!";
                }
                if (!values.eth_walllet_address) {
                    errors.eth_walllet_address = "Please Connect Your wallet";
                }
                if (!values.email) {
                    errors.email = "Email is Required!"
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = "Invalid email!";
                }
                if (!values.password) {
                    errors.password = "Password is Required!";
                }
                if (!values.password2) {
                    errors.password2 = "Confirm Password is Required!";
                }
                else if (values.password !== values.password2) {
                    errors.password2 = "Passwords Don't match!"
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm, errors }) => {
                try {
                    const res = await signUp(values);
                    resetForm();
                    props.setForm("login");
                    toast.success("Successfully Signed Up! A Verification link is sent to your Email address Please Click on it to activate your account, then Login.")
                    setSubmitting(false);
                } catch (error) {
                    toast.error("Something Went Wrong please check details for more Info.");
                    if (!error.data.non_field_errors) {
                        (error.data?.user.message[0])
                    } else {
                        toast.error(error.data.non_field_errors[0]);
                    }
                }
            }}
        >{({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <FloatingLabel
                controlId="floatingName"
                label="Full Name"
                className="mb-3"
            >
            <Form.Control
                type="text"
                placeholder="John Doe"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.fullname && !errors.fullname}
                isInvalid={touched.fullname && errors.fullname}                
                        />
            <Form.Control.Feedback type='valid'>{touched.fullname && "Enter the same name as in your Id, as this will be used for verification."}</Form.Control.Feedback>        
            <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingWaddr"
                label="WalletAddress"
                className="mb-3"
            >
            <Form.Control
                type="text"
                name="eth_walllet_address"
                disabled
                value={walletAddress}
                isValid={walletAddress}
                isInvalid={!walletAddress}
            />
            <Form.Control.Feedback type='invalid'>{errors.eth_walllet_address}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
            >
            <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>{touched.email && "Enter correct email as a verification link will be sent to it."}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
            />
            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            
            <FloatingLabel controlId="floatingPassword2" label="Confirm Password">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password2"
                    onBlur={handleBlur}
                    isValid={touched.password2 && !errors.password2}
                    isInvalid={touched.password2 && errors.password2}
            />
            <Form.Control.Feedback type='invalid'>{errors.password2}</Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type='submit'
                className='m-3 mx-auto' disabled={isSubmitting}>
                Sign Up
            </Button>
            </Form>)}
        </Formik>
    );
}

export default SignUpForm;