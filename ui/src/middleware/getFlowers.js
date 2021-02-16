import Axios from 'axios'

const getFlowers = (config) => {
    return Axios.get("plots/flowers", {...config, baseURL: process.env.REACT_APP_SVEVO_API_URL})
}

export default getFlowers