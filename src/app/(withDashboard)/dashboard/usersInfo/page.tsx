import Image from "next/image";

const UsersInfo = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
  const users = await res.json();

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Users Information</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-700">Image</th>
              <th className="p-3 border border-gray-700">Name</th>
              <th className="p-3 border border-gray-700">Email</th>
              <th className="p-3 border border-gray-700">Role</th>
              <th className="p-3 border border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.length > 0 ? (
              users?.data?.map((user) => (
                <tr key={user._id} className="text-center bg-gray-800">
                  <td className="p-3 border border-gray-700">
                    <Image
                      src={user.image || ""}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="p-3 border border-gray-700">{user.name}</td>
                  <td className="p-3 border border-gray-700">{user.email}</td>
                  <td className="p-3 border border-gray-700">{user.role}</td>
                  <td
                    className={`p-3 border border-gray-700 ${
                      user.status === "active"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersInfo;
