import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, CreditCard, Calendar, User, List } from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:5000/admin/orders");
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError("Failed to fetch order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading transactions...</p>
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
        <h1 className="text-4xl font-black text-white">Store Orders</h1>
        <p className="text-gray-400 text-sm mt-1">Transaction logs and accessory sales logs</p>
      </div>

      {orders.length === 0 ? (
        <div className="glass rounded-[28px] p-16 text-center border border-white/7">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-orange-400" size={28} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">No Orders Placed</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Once users purchase recommended accessories through the store checkout, payment transactions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass rounded-3xl p-6 border border-white/7 hover:border-orange-500/20 transition duration-300"
            >
              
              {/* ORDER SUMMARY HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Order ID:</span>
                    <span className="text-white font-mono text-sm">{order.order_id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{order.created_at?.split(".")[0] || "N/A"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/20 uppercase">
                    {order.status}
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-xs block">Amount Paid</span>
                    <span className="text-orange-400 font-black text-xl">₹{(order.amount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* CUSTOMER & PAYMENT DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 border-b border-white/5 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                    <User size={16} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block">Customer Email</span>
                    <span className="text-gray-200 font-semibold">{order.user_email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block">Razorpay Payment ID</span>
                    <span className="text-gray-200 font-mono text-xs">{order.payment_id || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* ITEMS IN THE ORDER */}
              <div className="pt-5 space-y-4">
                <h4 className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2 mb-3">
                  <List size={12} />
                  Purchased Items ({order.items?.length || 0})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 rounded-2xl bg-white/3 border border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <p className="text-white text-xs font-bold truncate leading-tight">{item.name}</p>
                        <p className="text-orange-400 text-sm font-black mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminOrders;
