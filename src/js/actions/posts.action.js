export function fetchProductsRequest(){
    return {
      type: "FETCH_REQUEST"
    }
  }
  
export function fetchProductsSuccess(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload
    }
  }
  
export function fetchProductsError() {
    return {
      type: "FETCH_ERROR"
    }
}