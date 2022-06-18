import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useCustomAlert} from "../../store/alert";

export const AlertArea: React.FC = () => {
    const [customAlert, setCustomAlert] = useCustomAlert();

    // アラートの非表示化
    const onCloseHandle = () => {
        setCustomAlert({open: false, message: customAlert.message, type: customAlert.type});
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={customAlert.open}
                autoHideDuration={3000}
                onClose={onCloseHandle}
            >
                <Alert onClose={onCloseHandle} severity={customAlert.type} sx={{width: '100%'}}>
                    {customAlert.message}
                </Alert>
            </Snackbar>
        </>
    );
};