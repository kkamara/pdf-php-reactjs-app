import { pdf, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function pdfReducer (state = initState, action) {
  switch (action.type) {
    
    case pdf.GET_PDF_ERROR:
    case pdf.CREATE_PDF_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case pdf.GET_PDF_PENDING:
    case pdf.CREATE_PDF_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case pdf.GET_PDF_SUCCESS:
    case pdf.CREATE_PDF_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
