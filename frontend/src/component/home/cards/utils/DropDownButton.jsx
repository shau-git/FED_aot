const DropDownButton = ({handleDropDown}) => {
  return (
    <>
        <select     
            className="bg-[rgba(0,0,0,0.5)] rounded-4xl border-2 border-white p-2 placeholder-white w-[181px] h-10 text-start pr-2"
            onChange={handleDropDown}
        >
            <option value="">All</option>
            <option value="S1">Season 1</option>
            <option value="S2">Season 2</option>
            <option value="S3">Season 3</option>
            <option value="S4">Season 4</option>
        </select>
    </>
  )
}

export default DropDownButton
