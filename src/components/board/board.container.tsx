export const Board = () => {
  return (
    <div className='flex flex-col flex-grow overflow-hidden'>
      <main className='flex-grow flex flex-col ml-2 space-y-4 overflow-auto'>
        <div className='bg-white p-2 rounded-lg shadow flex-shrink-0'>
          <h2 className='text-xl font-semibold mb-1'>Board Header</h2>
        </div>
        <div className='flex-grow overflow-auto no-scrollbar'>
          <div className='overflow-x-auto border border-gray-200 rounded-lg shadow-lg bg-gray-100 p-4 no-scrollbar '>
            {/* <WithEditor className={`bg-white h-a4 w-a4`} /> */}
            <div className='h-[3000px] w-[2000px] bg-red-500'></div>
          </div>
        </div>
      </main>
    </div>
  );
};
