import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Skeleton } from '@/ui/skeleton';

export const InfoFormFallback = () => {
  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="size-10 " />
        <Skeleton className="h-[16px] w-[200px]" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-full" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-full" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-4 pb-2">
            <Skeleton className="h-7 w-full" />

            <div>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="pt-2">
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Skeleton className="h-4 w-40" />
        </CardFooter>
      </Card>
    </>
  );
};
