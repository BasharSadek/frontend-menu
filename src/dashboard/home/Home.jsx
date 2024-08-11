import React, { useState, useEffect } from 'react'
import Header from "../../components/Header";
import Card from '../../components/Card'
import axios from 'axios';
import { CalendarMonth, CategoryOutlined, DarkModeOutlined, HomeOutlined, LightModeOutlined, NotificationsOutlined, Person2Outlined, PersonOutlineOutlined, PrecisionManufacturingOutlined, SettingsOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography, Paper, Stack, useTheme } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CollectionsIcon from '@mui/icons-material/Collections';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const Home = () => {
    document.title = 'Dashboard Home'

    const theme = useTheme();
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [item, setItem] = useState('')

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/home`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
            },
        }).then((response) => {
            //   console.log(response.data.discount)
            //   setDiscount(response.data.discount)
            setCategory(response.data.category)
            setSubcategory(response.data.subcategory)
            setItem(response.data.item)
            setDiscount(response.data.discount)
        }).catch((error) => {
            console.error(error)
        })

    }, [])
    return (
        <div>
            <Header
                isDashboard={true}
                title={"DASHBOARD"}
                subTitle={"Welcome to your dashboard"}
            />

            <Stack
                direction={"row"}
                flexWrap={"wrap"}
                gap={1}
                justifyContent={{ xs: "center", sm: "space-between" }}
            >


                <Card title='Discounts' quantity={discount}
                    icon={<MoneyOffIcon
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}
                    />} />
                <Card title='Categories' quantity={category}
                    icon={<CategoryOutlined
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}

                    />} />

                <Card title='Subcategory' quantity={subcategory}
                    icon={<PrecisionManufacturingOutlined
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}

                    />} />
                <Card title='Item' quantity={item}
                    icon={<ProductionQuantityLimitsIcon
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}
                    />} />
            </Stack>
        </div>
    )
}

export default Home