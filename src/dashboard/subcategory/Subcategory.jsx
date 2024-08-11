import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Subcategory = () => {
    document.title = 'Dashboard Subcategory'

    const theme = useTheme();
    const [subcategory, setSubcategory] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/subcategory/index`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
            },
        }).then((response) => {
            setSubcategory(response.data.subcategory)
        }).catch((error) => {
            console.error(error)
        })

    }, [count])
    const handleDeleteRow = (id) => {
        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/subcategory/destroy/${id}`, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
                },
            })
            setCount(x => x + 1)
        }

    }
    const columns = [
        { field: "subcategory_id", headerName: "ID", width: 80 },
        {
            field: "category_name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            // flex: 1,2

        },
        {
            field: "category_description",
            headerName: "Description",
            // flex: 1,
        },
        {
            field: "discount_code",
            headerName: "Discount Code",
            cellClassName: "name-column--cell",
            // flex: 1,

        },
        {
            field: "discount_value",
            headerName: "Discount Value",
            // flex: 1,
        },
        {
            field: "category_parent",
            headerName: "Category Parent",
            flex: 1,
        },
        {
            field: "actions", headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { subcategory_id } }) => {
                return (
                    <>
                        <Button
                            sx={{
                                "background": theme.palette.error.dark,
                                "color": "#fff",
                                "margin": "2px"
                            }}
                            startIcon={<DeleteIcon />}
                            variant="contained"
                            // color={}
                            onClick={() => handleDeleteRow(subcategory_id)}
                        >
                            Delete
                        </Button>
                        <Link to={`/editSubcategory/${subcategory_id}`}>
                            <Button
                                sx={{
                                    "background": theme.palette.success.main,
                                    "color": "#fff",
                                    "margin": "2px"
                                }}
                                startIcon={<EditIcon />}
                                variant="contained"
                            // color={}
                            >
                                Edit
                            </Button>
                        </Link>
                    </>
                );
            }
        },
    ];


    return (
        <Box>
            <Stack direction={"row"}>
                <Header
                    title="Subcategory"
                    subTitle="Here are all the subCategories in the store"
                />
                <Box flexGrow={1} />
                <Link to={`/createSubcategory`}><Button
                    sx={{
                        "background": theme.palette.primary.main,
                        "color": "#fff",
                        "margin": "2px",
                        "width": "120px",
                        "height": "50px"
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                // color={}
                >Add</Button></Link>
            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
                <DataGrid
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rows={subcategory}
                    // @ts-ignore
                    columns={columns}
                />
            </Box>
        </Box>
    )
}

export default Subcategory