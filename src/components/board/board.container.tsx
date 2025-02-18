import { WithEditor } from '../editor';

export const Board = () => {
  return (
    <div className='overflow-hidden flex  no-scrollbar h-full'>
      <WithEditor classNameEditorWrapper={`bg-white h-a4 w-a4`} />
    </div>
  );
};
