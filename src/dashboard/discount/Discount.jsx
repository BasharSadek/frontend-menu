import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Discount = () => {
  document.title = 'Dashboard Discount'

  const theme = useTheme();
  const [discount, setDiscount] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/index`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
      },
    }).then((response) => {
      console.log(response.data.discount)
      setDiscount(response.data.discount)
    }).catch((error) => {
      console.error(error)
    })

  }, [count])
  const handleDeleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete it ?")) {
      // @ts-ignore
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/destroy/${id}`, {
        headers: {
          'Accept': "application/json",
          Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
        },
      })
      setCount(x => x + 1)
    }

  }
  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 80 },
    {
      field: "discount_code",
      headerName: "Discount Code",
      cellClassName: "name-column--cell",
      flex: 1,

    },
    {
      field: "discount_value",
      headerName: "Discount Value",
      flex: 1,
    },
    {
      field: "actions", headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id } }) => {
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
              onClick={() => handleDeleteRow(id)}
            >
              Delete
            </Button>
            <Link to={`/editDiscount/${id}`}>
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
          title="Discount"
          subTitle="Here are all the Discount in the store"
        />
        <Box flexGrow={1} />
        <Link to={`/createDiscount`}><Button
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
          rows={discount}
          // @ts-ignore
          columns={columns}

        />
      </Box>
    </Box>
  )
}

export default Discount