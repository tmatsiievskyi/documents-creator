import { WithEditor } from '../editor';

export const Board = () => {
  return (
    <div className='w-full overflow-hidden  no-scrollbar'>
      <WithEditor classNameEditorWrapper={`bg-white h-a4 w-a4`} />
    </div>
  );
};
