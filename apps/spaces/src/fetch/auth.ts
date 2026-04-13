import axios from "axios"

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
}

export const fetchUser = async (spaceId: string) => {
  try {
    console.log(`[AUTH] fetchUser - spaceId: ${spaceId}, isProduction: ${isProduction()}`);

    let headers = {
      'X-Space': spaceId
    }

    if (isProduction()) {
      axios.defaults.withCredentials = true;
    } else {
      const token = window.localStorage.getItem('shira_access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers })

    axios.defaults.headers.common['X-Space'] = spaceId;
    console.log(`[AUTH] fetchUser - success, userId: ${res.data?.user?.id}`);

    return res.data
  } catch (err) {
    console.log(`[AUTH] fetchUser - error:`, err);
    throw err;
  }
}

export const login = async (email, pass) => {
  try {
    console.log(`[AUTH] login - attempting for email: ${email}`);
    
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: pass
    })

    if (isProduction()) {
      axios.defaults.withCredentials = true;
      console.log(`[AUTH] login - success, using httpOnly cookie`);
    } else {
      const token = res.data.access_token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      window.localStorage.setItem('shira_access_token', res.data.access_token);
      console.log(`[AUTH] login - success, using Bearer token (dev mode)`);
    }

    const spaceId = res.data.user.spaces[0].id
    window.localStorage.setItem('shira_x_space', spaceId)
    axios.defaults.headers.common['X-Space'] = `${spaceId}`;
    console.log(`[AUTH] login - userId: ${res.data.user.id}, spaceId: ${spaceId}`);
    
    return res.data.user
  } catch (e) {
    console.log(`[AUTH] login - error:`, e);
    alert('Unauthorized')
  }
}

export const checkAuth = async () => {
  const spaceId = window.localStorage.getItem('shira_x_space')
  console.log(`[AUTH] checkAuth - spaceId in localStorage: ${!!spaceId}, value: ${spaceId}`);
  
  if (spaceId) {
    try {
      const fetchUserResponse = await fetchUser(spaceId)
      console.log(`[AUTH] checkAuth - success, userId: ${fetchUserResponse?.user?.id}`);
      return fetchUserResponse
    } catch (err) {
      console.log(`[AUTH] checkAuth - failed:`, err?.response?.status);
      return null;
    }
  }
  
  console.log(`[AUTH] checkAuth - no X-Space in localStorage, skipping`);
  return null
}

export const logout = async () => {
  try {
    console.log(`[AUTH] logout - initiating`);
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
    window.localStorage.removeItem('shira_x_space')
    window.localStorage.removeItem('shira_access_token')
    axios.defaults.headers.common['X-Space'] = undefined;
    axios.defaults.headers.common['Authorization'] = undefined;
    console.log(`[AUTH] logout - success`);
  } catch (err) {
    console.log(`[AUTH] logout - error:`, err);
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
