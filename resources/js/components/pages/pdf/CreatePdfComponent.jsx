import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { createPdf, } from "../../../redux/actions/pdfActions"

import "./CreatePdfComponent.scss"

export default function CreatePdfComponent() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")

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
  }, [state.auth,])

  useEffect(() => {
    if (
      !state.pdf.loading && 
      !state.pdf.error && 
      state.pdf.data
    ) {
      console.log("pdf", state.pdf.data)
      return navigate("/pdf/"+state.pdf.data.id)
    }
  }, [state.pdf,])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    // dispatch create pdf.
    dispatch(createPdf({ name, birthday, }))

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
      <div className='container create-pdf-container'>
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
