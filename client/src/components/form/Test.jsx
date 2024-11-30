import { useForm } from "react-hook-form"
import LoadImage from "../Fallback/LoadImage"
import LoadPage from "../Fallback/LoadPage"


export default function Tests() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)


  return (
    <LoadPage />
  )
}