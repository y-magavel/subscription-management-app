import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useCustomAlert} from "../../store/alert";

export const AlertArea: React.FC = () => {
    const [customAlert, setCustomAlert] = useCustomAlert();

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={customAlert.open}
                autoHideDuration={3000}
                onClose={() => setCustomAlert({open: false, message: "", type: customAlert.type})}
            >
                <Alert onClose={() => setCustomAlert({open: false, message: "", type: customAlert.type})} severity={customAlert.type} sx={{ width: '100%' }}>
                    {customAlert.message}
                </Alert>
            </Snackbar>
        </>
    );
};