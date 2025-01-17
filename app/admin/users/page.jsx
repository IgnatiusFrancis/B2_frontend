import AllUsers from "@/components/AllUsers";
import { getUsers } from "@/lib/api";

async function Contents() {
  const [users] = await Promise.all([getUsers()]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">USERS</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">User Name</div>
            <div className="col-span-1 text-center">Email</div>
            <div className="col-span-2 text-center">Role</div>
            <div className="col-span-2 text-center">Date</div>
          </div>
        </div>
        <div>
          <AllUsers users={users} />
        </div>
      </div>
    </div>
  );
}
export default Contents;
