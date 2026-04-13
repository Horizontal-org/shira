import axios from "axios"

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
}

export const fetchUser = async (spaceId: string) => {
  try {

    let headers = {
      'X-Space': spaceId
    }

    if (isProduction()) {
      axios.defaults.withCredentials = true;
    } else {
      //DEV MODE
      const token = window.localStorage.getItem('shira_access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers })

    axios.defaults.headers.common['X-Space'] = spaceId;

    return res.data
  } catch (err) {
    console.log("🚀 ~ file: auth.ts ~ fetchUser ~ err", err)
  }
}

export const login = async (email, pass) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: pass
    })

    // In production, the token is stored in an HttpOnly cookie, so we don't need to set it in the headers manually.
    if (isProduction()) {
      axios.defaults.withCredentials = true;
    } else {
      //DEV MODE
      console.log('Login successful, setting token in localStorage and axios headers')
      const token = res.data.access_token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      window.localStorage.setItem('shira_access_token', res.data.access_token)
    }

    const spaceId = res.data.user.spaces[0].id
    window.localStorage.setItem('shira_x_space', spaceId)
    axios.defaults.headers.common['X-Space'] = `${spaceId}`;
    return res.data.user
  } catch (e) {
    alert('Unauthorized')
  }
}

export const checkAuth = async () => {
  const spaceId = window.localStorage.getItem('shira_x_space')
  if (spaceId) {
    const fetchUserResponse = await fetchUser(spaceId)
    return fetchUserResponse
  }
  return null
}

export const logout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
    window.localStorage.removeItem('shira_x_space')
    window.localStorage.removeItem('shira_access_token')
    axios.defaults.headers.common['X-Space'] = undefined;
    axios.defaults.headers.common['Authorization'] = undefined;
  } catch (err) {
    console.log("🚀 ~ logout ~ err:", err)
  }
}

export const getSub = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/subscription`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ getSub ~ err:", err)
  }
}

export const manageSubscription = async (organizationId: string) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/subscription/manage/${organizationId}`)
  return res.data
}

export const navigateToManageSubscription = async (
  organizationId: string,
  wantsToUpgrade: boolean
) => {
  try {
    const response = wantsToUpgrade ? await checkoutSubscription(organizationId) : await manageSubscription(organizationId)
    const stripeUrl = response?.url

    if (stripeUrl) {
      window.location.assign(stripeUrl)
    }
  } catch (error) {
    console.error("Error navigating to Stripe:", error)
  }
}

export const checkoutSubscription = async (organizationId: string) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/subscription/checkout/${organizationId}`)
  return res.data
}
