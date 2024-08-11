import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Alert, Avatar, Box, Button, Snackbar, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { useAuth } from "../../components/Auth";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    document.title = 'Dashboard Profile'

    const theme = useTheme()
    const [name, setName] = useState('')
    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
            },
        }).then((response) => {
            setName(response.data.user.name)

        }).catch((error) => {
            console.error(error)
        })

    }, [])

    const handleLogout = () => {
        const data = []
        if (window.confirm("Are you sure you want to logout ?")) {
            // @ts-ignore
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, data, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
                },
            }).then((response) => {
                console.log(response.data)
                localStorage.removeItem('restaurant')
                auth.logout();
                navigate('/signIn')
            }).catch((error) => {
                console.error(error)
            })
        }
    }


    return (
        <Box>
            <Stack direction={"row"}>
                <Header
                    title="Profile"
                    subTitle="Here you can edit your profile"
                />


            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>

                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography paragraph >
                        welcome  {name}
                    </Typography>
                    <Button onClick={handleLogout}
                        sx={{
                            "background": theme.palette.secondary.dark,
                            "color": "#fff",
                            "margin": "2px",
                            "width": "100px",
                        }}>Logout</Button>
                </Box></Box>
        </Box>
    )
}

export default Profile