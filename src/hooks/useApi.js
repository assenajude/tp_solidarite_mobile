
export default (apiFunc) => {
  const request = async () => {
      await apiFunc()
  }
 return request
}
