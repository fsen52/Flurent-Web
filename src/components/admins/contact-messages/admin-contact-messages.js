import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Loading from '../../common/loading/loading'
import { getMessagesByPage } from '../../../api/contact-service';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    name: "Subject",
    selector: (row) => row.subject
  },
  {
    name: "Visitor",
    selector: (row) => row.name
  }
]

const AdminContactMessages = () => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages ] = useState([])
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const navigate = useNavigate();

    const loadData = async (page, ) => {
        setLoading(true)
        try {
          const resp = await getMessagesByPage(page, perPage);
          setMessages(resp.data.content);
          setTotalRows(resp.data.totalElements);
        } catch (err) {
          console.log(err);
          
        }finally{
          setLoading(false);
        }
    }

      
    const handlePageChange = (page) =>{
    //this component start with 1 but our data start with 0
    loadData(page-1);
    }

    const handlePerRowsChange = async (newPerPage, page) => {
      loadData(page-1)
      setPerPage(newPerPage)      
    }

    const handleRowClick = (row) => { 
      navigate(`/rentadmin/contact-messages/${row.id}`);
   }

    useEffect(() => {
        loadData(0,2)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []
    )

  return (
    <div> <DataTable columns={columns} data={messages} progressPending={loading} progressComponent={<Loading/>} pagination
    paginationServer paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange}
    onChangePage={handlePageChange} onRowClicked={handleRowClick} pointerOnHover={true}/>
    </div>
  )
}

export default AdminContactMessages