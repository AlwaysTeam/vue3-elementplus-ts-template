const { MODE, VITE_SERVER_URL } = import.meta.env
const isDev = MODE === 'development' ? true : false
const config = {
  isDev,
  BaseURL: VITE_SERVER_URL,
  upload_url: VITE_SERVER_URL + '/api/upload/file',
}
export default config
