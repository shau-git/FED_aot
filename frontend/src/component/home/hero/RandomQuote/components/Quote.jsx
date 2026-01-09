const Quote = ({data}) => {
  return (
    <div className="text-left">
        <div className="space-y-2 mb-6">
            <div className="flex items-center  text-xl md:text-2xl font-bold tracking-tight ">
                <p>"{data.quote}"</p>
            </div>
            <p className="flex items-center text-xl md:text-2xl font-bold tracking-tight text-amber-900">
                - {data.author}
            </p>
        </div>
    </div>
    
  )
}

export default Quote