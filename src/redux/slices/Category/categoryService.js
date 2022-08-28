import { toast } from 'react-toastify'
import privateAxios from '../../../utils/privateAxios'

//CREATE CATEGORY
const create = async (category) => {
    const { data } = await privateAxios.post('/api/category/create',category)
    toast(data.message)
    return data
}




const categoryService = {
    create,
}
export default categoryService