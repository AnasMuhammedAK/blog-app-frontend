import { toast } from 'react-toastify'
import privateAxios from '../../../utils/privateAxios'

//CREATE CATEGORY
const create = async (category) => {
    const { data } = await privateAxios.post('/api/category/create',category)
    toast(data?.message)
    return data
}
//FETCH ALL CATEGORY
const fetchAll = async () => {
  // alert('Fetching all categories...')
    const { data } = await privateAxios.get('/api/category/all')
    console.log(data)
    return data
}
//FETCH CATEGORY
const fetchDetails = async (id) => {
      const { data } = await privateAxios.get(`/api/category/${id}`)
      return data
  }
//UPDATE CATEGORY
const update = async (category) => {
    const { data } = await privateAxios.put(`/api/category/${"id"}`,category)
    //toast(data.message)
    return data
}
//DELETE CATEGORY
const deleteCategory = async (id) => {
    const { data } = await privateAxios.delete(`/api/category/${id}`)
    //toast(data.message)
    return data
}




const categoryService = {
    create,
    fetchAll,
    update,
    deleteCategory,
    fetchDetails
}
export default categoryService