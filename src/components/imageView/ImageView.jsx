import { MdClose } from "react-icons/md";

const ImageView = ({ imgView, setImgView }) => {
  return (
    <div className="fixed h-full w-full top-0 left-0 z-[99] flex items-center justify-center" style={{ background:"rgba(18, 18, 18, 0.8)" }}>
        {/* {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg}/> } */}
        <div className="bg-white md:w-[650px] w-[500px] h-[500px] py-4 rounded-[18px]">
            <MdClose className='block text-[1.5rem] text-end mb-7 mt-[1rem] mr-[1rem] ml-auto cursor-pointer' onClick={() => setImgView(false)}/>
            <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col">
                <img src={imgView} alt="" className='w-full m-auto'/>
            </div>
        </div>
    </div>
  )
}

export default ImageView