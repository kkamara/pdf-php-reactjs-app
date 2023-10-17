
import HttpService from '../../services/HttpService'
import { pdfs, } from '../types'

export const getPdfs = page => {
  return async dispatch => {
  const http = new HttpService()
        
  dispatch({ type: pdfs.GET_PDFS_PENDING, })

    const tokenId = "user-token"
    const path = page ? 'pdf/?page='+page : 'pdf'
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.getData(path, tokenId).then(res => {
          resolve(dispatch({
            type: pdfs.GET_PDFS_SUCCESS,
            payload: res.data.data,
          }))
        }, error => {
          reject(dispatch({ 
            type : pdfs.GET_PDFS_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : pdfs.GET_PDFS_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
