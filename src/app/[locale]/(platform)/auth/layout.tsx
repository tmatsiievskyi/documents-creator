import { WithAppLogo } from '@/components/app-logo';
import { Card, CardContent } from '@/ui/card';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
              <CardContent className="grid p-0 text-center md:grid-cols-2">
                <div className="order-2 min-h-[470px]  p-6 md:p-8">{children}</div>
                <div className="relative order-1 flex items-center justify-center  border-b bg-zinc-200/20 py-8  md:border-b-0 md:border-r md:py-0">
                  <WithAppLogo logoColor="primary" customClassName="justify-center " />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
