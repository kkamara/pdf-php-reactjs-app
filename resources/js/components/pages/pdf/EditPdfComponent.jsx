import React, { useEffect, useState, } from 'react'
import { useNavigate, useParams, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { getPdf, /* editPdf, */ } from "../../../redux/actions/pdfActions"

import "./EditPdfComponent.scss"

export default function EditPdfComponent() {
  const navigate = useNavigate()
  const { id, } = useParams()
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    pdf: state.pdf
  }))

  useEffect(() => {
    if (!id) {
      return navigate("/pdf")
    }
    dispatch(getPdf(id))
  }, [])

  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
  }, [state.auth,])

  useEffect(() => {
    if (
      !state.pdf.loading && 
      !state.pdf.error && 
      state.pdf.data
    ) {
      console.log("pdf", state.pdf.data)
      setName(state.pdf.data.name)
      setBirthday(state.pdf.data.birthday)
    }
  }, [state.pdf,])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    // dispatch create pdf.
    // dispatch(editPdf(id, { name, birthday, }))

    setName("")
    setBirthday("")
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value)
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (state.auth.loading) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <div className='container edit-pdf-container'>
        <br />
        <br />
        <form 
          method="post" 
          onSubmit={handleSubmitForm}
          className="form"
        >
          {state.pdf.error ?
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {state.pdf.error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div> : null}
          <div className="form-group">
            <label id="nameLabel" htmlFor="name">Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name"
              id="nameInput"
              placeholder="Name..."
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label id="birthdayLabel" htmlFor="birthday">Birthday</label>
            <input 
              type="text" 
              className="form-control" 
              name="birthday"
              id="birthdayInput"
              placeholder="Birthday..."
              onChange={handleBirthdayChange}
              value={birthday}
            />
          </div>
          <input
            type="submit"
            className='btn btn-success'
          />
        </form>
      </div>
    </>       
  )
}
