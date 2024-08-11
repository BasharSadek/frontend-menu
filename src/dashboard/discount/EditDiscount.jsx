import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';

const numberRegex = /^[1-9][0-9]*$/;

const EditDiscount = () => {
  document.title = 'Dashboard Update Discount'

  const { id } = useParams();
  const [discount_code, setDiscount_code] = useState('')
  const [discount_value, setDiscount_value] = useState('')
  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/show/${id}`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
        "lang": "en"
      },

    }).then((response) => {
      console.log(response.data.tax)
      setDiscount_code(response.data.discount.discount_code)
      setDiscount_value(response.data.discount.discount_value)
    }).then((response) => { });

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
    console.log("doneeeeeeeeeeee", discount_code, discount_value);
    const data = {
      discount_code: discount_code,
      discount_value: discount_value,
    }
    // @ts-ignore
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/update/${id}`, data, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
      },
    }).then((response) => {
    });
    handleClick();
  };

  return (
    <Box>
      <Header title="Update Discount" subTitle="Here you can update Discounts" />
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


        <TextField
          error={Boolean(errors.discount_code)}
          helperText={
            Boolean(errors.discount_code)
              ? "This field is required & min 2 character"
              : null
          }
          {...register("discount_code", { required: discount_code == '' ? true : false, minLength: 2 })}
          sx={{ flex: 1 }}
          label="Discount Code"
          variant="filled"
          value={discount_code}
          // @ts-ignore
          onChange={(e) => setDiscount_code(e.target.value)}
        />

        <TextField
          error={Boolean(errors.discount_value)}
          helperText={
            Boolean(errors.discount_value)
              ? "This field is required & number from 1 to 100"
              : null
          }
          {...register("discount_value", { required: discount_value == '' ? true : false, pattern: numberRegex })}
          sx={{ flex: 1 }}
          label="Discount Value"
          variant="filled"
          value={discount_value}
          // @ts-ignore
          onChange={(e) => setDiscount_value(e.target.value)}
        />

        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Update Discount
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Discount updated successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>


    </Box>
  )
}

export default EditDiscount