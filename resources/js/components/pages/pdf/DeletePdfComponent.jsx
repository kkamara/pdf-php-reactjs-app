import React, { useEffect, useState, } from 'react'
import { useNavigate, useParams, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { getPdf, /*deletePdf,*/ } from "../../../redux/actions/pdfActions"

import "./DeletePdfComponent.scss"

export default function DeletePdfComponent() {
  const navigate = useNavigate()
  const { id, } = useParams()
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [choice, setChoice] = useState("n")

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
    // dispatch(deletePdf(id, { choice, }))
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
      <div className='container delete-pdf-container'>
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
              value={name}
              disabled={true}
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
              value={birthday}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label id="choiceLabel" htmlFor="choice">
              Are You Sure You Want To Delete {name}?
            </label> &nbsp;
            <select 
              name="choice" 
              id="choice"
              value={choice}
              className="form-control"
            >
              <option value="n">No</option>
              <option value="y">Yes</option>
            </select>
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
