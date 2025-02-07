import axios from "axios"

export const fetchUser = async(token: string) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: auth.ts ~ line 12 ~ fetchUser ~ err", err)
  }
}

export const login = async(email, pass) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: pass
    })
    
    window.localStorage.setItem('shira_access_token', res.data.access_token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
    return res.data.user
  } catch (e) {
    alert('Unauthorized')
  }
}

export const checkAuth = async() => {
  const token = window.localStorage.getItem('shira_access_token')
  if (token) {
    const user = await fetchUser(token)
    return user 
  } else {
    return null
  }

}