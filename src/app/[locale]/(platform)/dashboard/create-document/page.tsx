// import { WithBoard } from '@/components/board';
import { WithEditor } from '@/components/editor';

const Page = () => {
  return (
    <>
      {/* <WithBoard /> */}
      <WithEditor classNameEditorWrapper={`bg-white h-a4 w-a4`} />
    </>
  );
};

export default Page;
