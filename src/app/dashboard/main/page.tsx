import MainWapper from '@/components/main/main';

export default function DashboardHome() {
  return (
    <>
      <div className="h-full w-full  relative overflow-y-auto ">
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <MainWapper />
          </div>
        </div>
      </div>
    </>
  );
}
