import { icons } from '@/ui';

const UserProfilePage = () => {
  const UserIcon = icons['User'];
  return (
    <div className="container  h-full max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserIcon className="size-8 text-primary" />
          <h1 className="text-3xl font-bold">Full Name</h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
