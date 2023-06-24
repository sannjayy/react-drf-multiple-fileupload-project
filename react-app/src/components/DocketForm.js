import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import TextField from './Common/Fields/TextField';


export default function DocketForm({ isLoading, handleSubmit, data }) {
    const validate = Yup.object({

    })
    return (
        <Formik
            initialValues={{
                "title": data?.title,
                "files": null 
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
        >
            {formik => (
                <Form>
                    <div className='row' id='uploadForm'>
                        <div className="col-md-12 mb-4">
                            <TextField label='Title *' type="text" name='title' placeholder='Title' sx={{ mt: 2 }} />

                            <input
                                className='mt-2 form-control'
                                name="files"
                                type="file"
                                multiple
                                onChange={(event) => {
                                    formik.setFieldValue("files", Array.from(event.target.files));
                                }}
                            />
                        </div>

                    </div>
                    <button type='submit' className='btn btn-lg btn-primary' disabled={isLoading}>Update</button>
                </Form>
            )}
        </Formik>
    )
}
