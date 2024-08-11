import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, Input, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';
const numberRegex = /^[1-9][0-9]*$/;

const CreateItem = () => {
  document.title = 'Dashboard Create Item'

  const [item_name, setItem_name] = useState('')
  const [item_description, setItem_description] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState([])
  const [getcatgory, setGetcatgory] = useState([])
  const [discount_id, setDiscount_id] = useState('')
  const [category_id, setCategory_id] = useState('')

  useEffect(() => {


    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/index`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,

      },
    }).then((response) => {
      // console.log(response.data.tax)
      setDiscount(response.data.discount)
    }).catch((error) => {
      console.error(error)
    })

    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/item/getcategory`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,

      },
    }).then((response) => {
      // console.log(response.data.tax)
      setGetcatgory(response.data.category)
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    // console.log("doneeeeeeeeeeee");
    const formData = new FormData();
    formData.append('item_name', item_name);
    formData.append('item_description', item_description);
    formData.append('price', price);
    formData.append('category_id', category_id);
    if (discount_id != '') {
      formData.append('discount_id', discount_id);
    }
    // @ts-ignore
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/item/store`, formData, {
      headers: {
        'Content-Type': "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
      },

    });
    handleClick();

  };


  return (
    <Box>


      <Header title="Create Item" subTitle="Here you can add items" />

      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        {/* <Stack sx={{ gap: 2 }} direction={"row"}> */}
        <TextField
          error={Boolean(errors.item_name)}
          helperText={
            Boolean(errors.item_name)
              ? "This field is required & min 3 character"
              : null
          }
          {...register("item_name", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="Item Name"
          variant="filled"
          // @ts-ignore
          // value={item_name}
          // @ts-ignore
          onChange={(e) => setItem_name(e.target.value)}
        />

        <TextField
          error={Boolean(errors.item_description)}
          helperText={
            Boolean(errors.item_description)
              ? "This field is required & min 3 character"
              : null
          }
          {...register("item_description", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="Item description"
          variant="filled"
          // @ts-ignore
          // value={item_description}
          // @ts-ignore
          onChange={(e) => setItem_description(e.target.value)}
        />

        <TextField
          error={Boolean(errors.price)}
          helperText={
            Boolean(errors.price)
              ? "This field is required & number"
              : null
          }
          {...register("price", { required: true, pattern: numberRegex })}
          sx={{ flex: 1 }}
          label="Item Price"
          variant="filled"
          // @ts-ignore
          // value={price}
          // @ts-ignore
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          // error={Boolean(errors.category_id)}
          variant="filled"
          id="outlined-select-currencys"
          select
          required
          label="category parent"
          // defaultValue="User"
          // @ts-ignore
          onChange={(e) => setCategory_id(e.target.value)}
        // {...register("category_id", { required: true })}

        >

          {getcatgory.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.category_name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="filled"
          id="outlined-select-currency"
          select
          label="discount code"
          // defaultValue="User"
          // @ts-ignore
          onChange={(e) => setDiscount_id(e.target.value)}
        >

          {discount.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.discount_code}
            </MenuItem>
          ))}
        </TextField>


        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Item Subcategory
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Item created successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>


    </Box>

  )
}

export default CreateItem