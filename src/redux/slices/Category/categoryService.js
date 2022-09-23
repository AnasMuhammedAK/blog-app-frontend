import { toast } from 'react-toastify'
import privateAxios from '../../../utils/privateAxios'
import publicAxios from '../../../utils/publicAxios'
//CREATE CATEGORY
const create = async (category) => {
    const { data } = await privateAxios.post('/api/category/create',category)
    toast(`Category "${data?.title}" created`)
    return data
}
//FETCH ALL CATEGORY
const fetchAll = async (category) => {
    const { data } = await publicAxios.get(`/api/category/all`)
    return data
}
//FETCH CATEGORY
const fetchDetails = async (id) => {
      const { data } = await publicAxios.get(`/api/category/${id}`)
      return data
  }
//UPDATE CATEGORY
const update = async ({title, id}) => {
    const { data } = await privateAxios.put(`/api/category/${id}`,{title})
    toast(`Category updated to "${data?.title}"`)
    return data
}
//DELETE CATEGORY
const deleteCategory = async (id) => {
    const { data } = await privateAxios.delete(`/api/category/${id}`)
    toast(`Category "${data?.title}" deleted`)
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