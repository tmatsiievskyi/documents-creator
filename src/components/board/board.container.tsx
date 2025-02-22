import { WithEditor } from '../editor';

export const Board = () => {
  return (
    <div className="no-scrollbar w-full  overflow-hidden">
      <WithEditor classNameEditorWrapper={`bg-white h-a4 w-a4`} />
    </div>
  );
};
