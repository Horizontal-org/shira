import axios from "axios"

export const fetchUser = async(token: string, spaceId: string) => {
  console.log("🚀 ~ fetchUser ~ spaceId:", spaceId)
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Space': spaceId
      }
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['X-Space'] = spaceId;
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
    // you need to have at least one space
    window.localStorage.setItem('shira_x_space', res.data.user.spaces[0].id)
    axios.defaults.headers.common['X-Space'] = `${res.data.user.spaces[0].id}`;
    return res.data.user
  } catch (e) {
    alert('Unauthorized')
  }
}

export const checkAuth = async() => {
  const token = window.localStorage.getItem('shira_access_token')
  const spaceId = window.localStorage.getItem('shira_x_space')
  if (token && spaceId) {
    const user = await fetchUser(token, spaceId)
    return user 
  } else {
    return null
  }

}