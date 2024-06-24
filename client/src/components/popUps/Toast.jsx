export default function Toast({ message, data }) {
  return (
    <>
      <div className="fixed bottom-[5px] right-[15px] bg-white z-[9999999999] py-[8px] px-[10px] shadow-lg rounded-md border-t-[5px] border-black">
        <div className="text-sm">
          <div className="text-md font-bold">
          {message}
          </div>
          {data.map((item, index) => {
            const file = item.split('/').pop()
            return (
              <div key={index}>
               <span className="text-md font-semibold text-gray-500">File name: </span> {file}
           </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
