import React, { useEffect, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { getPdf, } from "../../../redux/actions/pdfActions"

import "./PdfPageComponent.scss"

export default function PdfPageComponent() {
  const navigate = useNavigate()
  const { id, } = useParams()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    pdf: state.pdf
  }))

  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
    dispatch(getPdf(id))
  }, [state.auth,])

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (!state.pdf.loading && typeof state.pdf.data === 'object' && null !== state.pdf.data) {
    console.log('pdf', state.pdf.data)
  }
  if (state.auth.loading || state.pdf.loading || !state.pdf.data) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <div className='container'>
        <br />
        <br />
        {state.pdf.data.users_id === state.auth.data.id ? <>
          <a
            href={`/pdf/${state.pdf.data.id}/edit`}
            className="btn btn-lg btn-warning"
          >
            Edit
          </a> &nbsp;
          <a
            href={`/pdf/${state.pdf.data.id}/delete`}
            className="btn btn-lg btn-danger"
          >
            Delete
          </a>
        </> : null}
        <br />
        <embed 
          type="application/pdf" 
          src={`data:application/pdf;base64,${state.pdf.data.content}`}
          width={1000}
          height={400}
        />
      </div>
    </>       
  )
}
