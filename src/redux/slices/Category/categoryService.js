import { toast } from 'react-toastify'
import privateAxios from '../../../utils/privateAxios'

//CREATE CATEGORY
const create = async (category) => {
    const { data } = await privateAxios.post('/api/category/create',category)
    toast(data.message)
    return data
}
//FETCH ALL CATEGORY
const fetchAll = async () => {
  // alert('Fetching all categories...')
    const { data } = await privateAxios.get('/api/category/all')
    console.log(data)
    //toast(data.message)
    return data
}




const categoryService = {
    create,
    fetchAll
}
export default categoryService