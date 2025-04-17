import { Skeleton } from '@/ui/skeleton';

export const SidebarActionFallback = () => {
  return (
    <div className="space-y-2">
      <div className="p-2">
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="px-2 pl-5">
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
