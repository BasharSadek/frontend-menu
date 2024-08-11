import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';

const numberRegex = /^[1-9][0-9]*$/;

// const numberRegex = /^[1-9]$|^[1-9][0-9]$|^(100)$/;

const CreateDiscount = () => {
    document.title = 'Dashboard Create Discount'

    const [discount_code, setDiscount_code] = useState('')
    const [discount_value, setDiscount_value] = useState('')

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
        const data = {
            discount_code: discount_code,
            discount_value: discount_value,
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/discount/store`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('restaurant')}`,
            },

        });
        handleClick();
        setDiscount_code('')
        setDiscount_value('')
    };

    return (
        <Box>


            <Header title="Create Discount" subTitle="Here you can add Discounts" />

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
                            ? "This field is required & min 3 character"
                            : null
                    }
                    {...register("discount_code", { required: true, minLength: 3 })}
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
                    {...register("discount_value", { required: true, pattern: numberRegex, min: 1, max: 100 })}
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
                        Create Discount
                    </Button>

                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                            Discount created successfully
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>


        </Box>
    )
}

export default CreateDiscount