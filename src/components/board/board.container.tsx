import { WithEditor } from '../editor';

export const Board = () => {
  return (
    <div className='overflow-hidden flex flex-col rounded-lg bg-white no-scrollbar ml-4 mt-4'>
      <WithEditor classNameEditorWrapper={`bg-white h-a4 w-a4`} />
    </div>
  );
};
