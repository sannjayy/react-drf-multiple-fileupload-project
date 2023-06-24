import React from 'react'
import { useDocketList } from '../hooks/docket';

export default function DocketTable({ setData }) {
    const { docketsData, docketIsLoading } = useDocketList()
    return (
        <div>
            {docketsData && !docketIsLoading && <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Docket</th>
                        <th>Total Files</th>
                    </tr>
                </thead>
                <tbody>
                    {docketsData?.data.map((data, i) => {
                        return <tr key={i}>
                            <td>{data.id}</td>
                            <td>                                
                                <a href="#uploadForm" onClick={() => setData(data)}>{data.title}</a>
                            </td>
                            <td>{data.uploaded_items.length}</td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </div>
    )
}
