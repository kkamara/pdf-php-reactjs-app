import { pdfs, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function pdfsReducer (state = initState, action) {
  switch (action.type) {
    
    case pdfs.GET_PDFS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case pdfs.GET_PDFS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case pdfs.GET_PDFS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
