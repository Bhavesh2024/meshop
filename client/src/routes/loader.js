import axios from 'axios'
export const loadData = async (url) =>{
  const response = await axios.get(url)
  try{
    if(response.status == 200){
      return response.data;
    }
  } catch(error){
    if(response.status == 404){
      console.log('Data Not Found')
    } else if(response.status == 500){
      console.log('Internal Server Not Respond')
    } else if(response.status >= 100 && response.status <= 200){
      console.log('Trying to Fetch Invalid Data')
    }
  }

  return false;
}