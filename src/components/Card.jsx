import { Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

const Card = ({ icon, title, quantity }) => {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                flexGrow: 1,
                minWidth: "333px",
                p: 1.5,
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Stack gap={1} direction={"row"}>
                <Stack >
                    {icon}
                    <Typography variant="body2" sx={{ fontSize: "40px", color: theme.palette.info.light }}>
                        {quantity}
                    </Typography>
                </Stack>
                <Stack >
                    <Typography variant="body2" sx={{ fontSize: "30px", color: theme.palette.success.light, marginLeft: "60px" }}>
                        {title}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default Card