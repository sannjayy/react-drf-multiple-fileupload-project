import React, { useState } from 'react'
import DocketTable from '../components/DocketTable'
import DocketForm from '../components/DocketForm'
import { useDocketUpdate } from '../hooks/docket';


export default function DocketPage() {
    const [data, setData] = useState(null)
    const { handleDocketAction, docketActionIsLoading } = useDocketUpdate();


    const handleUpdateDocketSubmit = async (values, { resetForm }) => {
        const { title, files } = values
        const formData = new FormData();

        files && files.forEach(file => {
            formData.append("files", file);
        });
        for (let key in values) {
            if (key === 'files') { continue; }
            formData.append(key, values[key]);
        }

        // formData.append('title', title); 

        const res = await handleDocketAction(formData, data.id)
        console.log('Response -> ', res)

    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <DocketTable setData={setData} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 mt-5'>
                    <h3 className='display-6'>{data?.title}</h3>
                    <hr />
                    {docketActionIsLoading && 'PLEASE WAIT...'}
                    {data && <DocketForm
                        data={data}
                        handleSubmit={handleUpdateDocketSubmit}

                    />}
                </div>
            </div>
        </div>
    )
}
