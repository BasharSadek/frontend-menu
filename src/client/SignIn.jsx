import React, { useState, useEffect } from "react"
import axios from "axios"
import { Alert, Avatar, Button, Input, MenuItem, Paper, Box, useTheme, Snackbar, Stack, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { grey, red } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
// const numberRegex = /^[1-9][0-9]*$/;
// const regEmail =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
const loginSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8,
        'Password must be at least 8 characters').required('Password is required'),
});
import { useAuth } from "../components/Auth";
const SignIn = () => {
    document.title = 'sign-in'
    const navigate = useNavigate()
    const theme = useTheme();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const auth = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });
    // useEffect(() => {
    //     if (localStorage.getItem('restaurant') != null) {
    //       navigate('/')
    //     }
    //   }, [])
    const onSubmit = (data) => {
        console.log(data);
        // alert(data.email)
        // Handle login logic here
        setLoading(true)
        const mYData = {
            email: data.email,
            password: data.password,

        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, mYData
        )
            .then((response) => {
                console.log(response.data.token);
                localStorage.setItem('restaurant', response.data.token)
                setLoading(false)
                auth.login(email)
                navigate('/', { replace: true });
            }).catch((error) => {
                console.error(error)
                setLoading(false)
                alert('email or password is wrong')
            })
    };


    return (
        <Box sx={{
            display: "flex", justifyContent: "center",
            alignItems: "center", height: "100%", background: ""
        }}>

            <Paper
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    // flex: 1,
                    width: "400px",
                    background: grey[200],
                    padding: "20px",
                    marginTop: "180px",
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="body2" sx={{ fontSize: "40px", color: theme.palette.info.main }}>
                    Restaurant
                </Typography>

                <TextField
                    {...register("email")}
                    sx={{ flex: "1", width: "100%" }}
                    label='E-mail'
                    variant="filled"
                    // @ts-ignore
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p style={{ "color": "red" }} >{errors.email.message}</p>}
                <TextField

                    {...register("password")}
                    sx={{ flex: "1", width: "100%" }}
                    label='password'
                    variant="filled"
                    type="password"

                    // @ts-ignore
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ "color": "red" }} >{errors.password.message}</p>}
                <Button
                    type="submit"
                    sx={{ textTransform: "capitalize", background: orange[600] }}
                    variant="contained"
                >
                    sign in
                    {loading ? <CircularProgress sx={{ color: theme.palette.success.dark }} /> : null}
                </Button>
            </Paper>
        </Box>
    )
}

export default SignIn