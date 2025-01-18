import { getPaint } from "@/actions/Paint"
import PaintForm from "@/components/AddPaintsComponents/PaintForm"

export default async function Page({params}) {

  const id = (await params).id
  const paint = await getPaint(id, true)

  return (
    <PaintForm initialValues={paint} />
  )
}
