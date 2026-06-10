import { useEffect, useState } from "react";
import axios from "axios";
import { User, Shield, ShieldAlert, Ban, CheckCircle, Calendar, Mail } from "lucide-react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/admin/users");
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to load users catalog.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;
    try {
      const res = await axios.put(`http://127.0.0.1:5000/admin/users/${userId}`, {
        role: newRole
      });
      if (res.data.success) {
        alert("User role updated successfully!");
        fetchUsers();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user role.");
    }
  };

  const handleUpdateStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    if (!window.confirm(`Are you sure you want to change this user's status to ${newStatus.toUpperCase()}?`)) return;
    try {
      const res = await axios.put(`http://127.0.0.1:5000/admin/users/${userId}`, {
        status: newStatus
      });
      if (res.data.success) {
        alert("User status updated successfully!");
        fetchUsers();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user status.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading registered users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-[24px] p-6 border border-red-500/20 text-center max-w-xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-lg mb-2">Error</h2>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-white">Registered Users</h1>
        <p className="text-gray-400 text-sm mt-1">Manage user catalog access control and permissions</p>
      </div>

      {/* TABLE */}
      <div className="glass rounded-[24px] border border-white/8 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/2">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Date Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/1 transition duration-200">
                  
                  {/* USER INFO */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                        <User size={16} />
                      </div>
                      <span className="text-white font-bold text-sm">{user.name}</span>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail size={14} className="text-gray-500" />
                      <span>{user.email}</span>
                    </div>
                  </td>

                  {/* ROLE BADGE */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        user.role === "admin"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {user.role === "admin" ? <Shield size={12} /> : <User size={12} />}
                      <span className="capitalize">{user.role}</span>
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        user.status === "blocked"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-green-500/10 text-green-400 border-green-500/20"
                      }`}
                    >
                      {user.status === "blocked" ? <Ban size={12} /> : <CheckCircle size={12} />}
                      <span className="capitalize">{user.status || "active"}</span>
                    </span>
                  </td>

                  {/* DATE JOINED */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar size={12} className="text-gray-600" />
                      <span>{user.created_at?.split(" ")[0] || "N/A"}</span>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => handleUpdateRole(user.id, user.role)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/35 hover:bg-purple-500/10 text-xs font-bold text-gray-300 hover:text-purple-300 transition duration-300"
                    >
                      Toggle Role
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(user.id, user.status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition duration-300 ${
                        user.status === "blocked"
                          ? "bg-green-500/10 border-green-500/25 text-green-400 hover:bg-green-500 hover:text-white"
                          : "bg-red-500/10 border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      {user.status === "blocked" ? "Activate" : "Block"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminUsers;
