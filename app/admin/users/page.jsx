import AllUsers from "@/components/AllUser";

function FollowersDashboard() {
  return (
    <>
      <div className="w-full md:10/12">
        <div className="p-2 w-full flex flex-col gap-2">
          <h1 className="text-xl ">All Users</h1>
          <div className="min-h-72">
            <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
              <div className="w-7/12">
                <h1 className={` text-xs`}>Users</h1>
              </div>
              <h1 className={` w-3/12 text-xs`}>Date</h1>

              <h1 className={` w-3/12 text-xs`}>Role</h1>
              <h1 className={` w-2/12 text-xs`}>Action</h1>
            </div>

            <AllUsers />
          </div>
        </div>

        <div className="p-2 w-full flex flex-col gap-2">
          <h1 className="text-xl ">Comments</h1>
          <div className="h-72">
            <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
              <div className="w-7/12">
                <h1 className={` text-xs`}>Comments</h1>
              </div>
              <h1 className={` w-3/12 text-xs`}>Date</h1>

              <h1 className={` w-2/12 text-xs`}>Action</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowersDashboard;
