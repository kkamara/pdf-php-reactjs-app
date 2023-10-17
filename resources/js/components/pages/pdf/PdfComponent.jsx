import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { getPdfs, } from "../../../redux/actions/pdfsActions"

import "./PdfComponent.scss"

export default function PdfComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    pdfs: state.pdfs
  }))

  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
    dispatch(getPdfs())
  }, [state.auth,])

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (selected > state.pdfs.data.last_page) {
      return
    }
    dispatch(getPdfs(newPage))
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  const renderLink = ({ id, name, }) => {
    return <a href={`/pdf/${id}`}>
      {name}
    </a>
  }

  const renderList = () => {
    if (!state.pdfs.data) {
      return null
    }
    return (
      <>
        <ul className="list-group">
          {state.pdfs.data.data.map((pdf, index) => (
            <li key={index} className='list-group-item pdf-item'>
              <strong>name</strong> ({renderLink(pdf)}), 
              <strong>created_at</strong> ({parseDate(pdf.created_at)}),
              <strong>updated_at</strong> ({parseDate(pdf.updated_at)})
            </li>
          ))}
        </ul>
        <strong>page</strong> ({state.pdfs.data.current_page}),
        <strong>page_count</strong> ({state.pdfs.data.last_page}),
        <strong>displayed_items</strong> ({state.pdfs.data.data.length}),
        <strong>items</strong> ({state.pdfs.data.total})
      </>
    )
  }

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (!state.pdfs.loading && typeof state.pdfs.data === 'object' && null !== state.pdfs.data) {
    console.log('pdfs', state.pdfs.data)
  }
  if (state.auth.loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='container'>
        <br />
        <br />
        <a 
          className="btn btn-lg btn-success"
          onClick={() => { return navigate("/pdf/create") }}
        >
          Create
        </a>
        {renderList()}
        <br />
        <br />
        {false ?
          <>
            <br />
            <ReactPaginate
              onPageChange={handlePageChange}
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={state.pdfs.data.last_page}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName="pagination"
              activeClassName="active"
              forcePage={state.pdfs.data.current_page - 1}
            />
          </> : null}
      </div>
    </>       
  )
}
