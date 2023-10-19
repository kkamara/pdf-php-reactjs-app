import React from 'react'
import { Routes, Route, } from 'react-router-dom'

import Header from './components/layouts/Header'

import Home from "./components/pages/HomeComponent"
import Login from "./components/pages/auth/LoginComponent"
import Logout from "./components/pages/auth/LogoutComponent"
import Register from "./components/pages/auth/RegisterComponent"

import Pdf from "./components/pages/pdf/PdfComponent"
import PdfPage from "./components/pages/pdf/PdfPageComponent"
import CreatePdf from "./components/pages/pdf/CreatePdfComponent"
import EditPdf from "./components/pages/pdf/EditPdfComponent"

import { url } from './utils/config'

export default () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={url("/")} element={<Home />}/>
        <Route path={url("/user/login")} element={<Login />}/>
        <Route path={url("/user/logout")} element={<Logout />}/>
        <Route path={url("/user/register")} element={<Register />}/>
        <Route path={url("/pdf")} element={<Pdf />}/>
        <Route path={url("/pdf/:id")} element={<PdfPage />}/>
        <Route path={url("/pdf/create")} element={<CreatePdf />}/>
        <Route path={url("/pdf/:id/edit")} element={<EditPdf />}/>
      </Routes>
    </>
  )
}
