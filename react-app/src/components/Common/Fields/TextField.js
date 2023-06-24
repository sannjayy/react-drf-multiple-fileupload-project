import React from 'react'
import MuiTextField from '@mui/material/TextField';
import { useField } from 'formik';

export default function TextField({ label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<MuiTextField 
			label={label}
			variant='outlined'
            margin="dense"
			fullWidth
			{...field}
			{...props}
			error={meta.touched && Boolean(meta.error)}
			helperText={meta.touched && meta.error}
		/>
	)
}
