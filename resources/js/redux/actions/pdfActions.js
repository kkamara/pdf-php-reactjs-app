
import HttpService from '../../services/HttpService'
import { pdf, } from '../types'

export const getPdf = id => {
  return async dispatch => {
    const http = new HttpService()
          
    dispatch({ type: pdf.GET_PDF_PENDING, })

    const tokenId = "user-token"
    const path = 'pdf/'+id
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.getData(path, tokenId).then(res => {
          resolve(dispatch({
            type: pdf.GET_PDF_SUCCESS,
            payload: res.data.data,
          }))
        }, error => {
          reject(dispatch({ 
            type : pdf.GET_PDF_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : pdf.GET_PDF_ERROR, 
          payload: error,
        }))
      })
    })
  }
}

export const createPdf = ({ name, birthday, }) => {
  return async dispatch => {
    const http = new HttpService()
    
    dispatch({ type: pdf.CREATE_PDF_PENDING, })

    const tokenId = "user-token"
    const path = 'pdf/'
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.postData(path, { name, birthday }, tokenId).then(res => {
          resolve(dispatch({
            type: pdf.CREATE_PDF_SUCCESS,
            payload: res.data.data,
          }))
        }, error => {
          reject(dispatch({ 
            type : pdf.CREATE_PDF_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : pdf.GET_PDF_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
