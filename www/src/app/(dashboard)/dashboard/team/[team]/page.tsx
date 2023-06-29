const page = ({ params }: { params: { team: string } }) => {
  return (
    <div>
      <h1>Team {params.team}</h1>
    </div>
  )
}

export default page
