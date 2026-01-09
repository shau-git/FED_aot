const Introduction = ({data}) => {
  return (
    <>
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
            Eren <span className="text-neutral-500 italic">Yeager</span>
        </h1>
        
        <p className="text-md md:text-md text-neutral-400 italic mb-8 border-l-2 border-amber-900/40 pl-6 max-w-sm">
            "{data.quote}"
        </p>
    </>
  )
}

export default Introduction // ${!slice ? "overflow-y-scroll" : "overflow-hidden"}