import axios from "axios"

axios.defaults.withCredentials = true;

export const fetchUser = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`)
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
    console.log(`[AUTH] login - success`);
    return res.data.user
  } catch (e) {
    console.log(`[AUTH] login - error:`, e);
    alert('Unauthorized')
  }
}

export const checkAuth = async () => {
  try {
    return await fetchUser()
  } catch (err) {
    console.log(`[AUTH] checkAuth - failed:`, err?.response?.status);
    return null;
  }
}

export const logout = async () => {
  try {
    console.log(`[AUTH] logout - initiating`);
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
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
