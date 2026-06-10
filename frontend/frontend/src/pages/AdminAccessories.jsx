import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";

function AdminAccessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null); // null means "Add Mode"
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: 4.5,
    image: "",
    description: "",
    damage_type: "general"
  });

  const damageCategories = [
    { value: "dent", label: "Dent" },
    { value: "scratch", label: "Scratch" },
    { value: "crack", label: "Crack" },
    { value: "glass_shatter", label: "Glass Shatter" },
    { value: "lamp_broken", label: "Broken Lamp" },
    { value: "tire_flat", label: "Flat Tire" },
    { value: "general", label: "General Recommendation" }
  ];

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/admin/accessories");
      if (res.data.success) {
        setAccessories(res.data.accessories);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to fetch accessories database.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedAccessory(null);
    setFormData({
      name: "",
      price: "₹",
      rating: 4.5,
      image: "",
      description: "",
      damage_type: "general"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (acc) => {
    setSelectedAccessory(acc);
    setFormData({
      name: acc.name,
      price: acc.price,
      rating: acc.rating || 4.5,
      image: acc.image,
      description: acc.description,
      damage_type: acc.damage_type || "general"
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accessory?")) return;
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/admin/accessories/${id}`);
      if (res.data.success) {
        alert("Accessory deleted successfully!");
        fetchAccessories();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete accessory.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAccessory) {
        // Edit mode
        const res = await axios.put(
          `http://127.0.0.1:5000/admin/accessories/${selectedAccessory.id}`,
          formData
        );
        if (res.data.success) {
          alert("Accessory updated successfully!");
          setIsModalOpen(false);
          fetchAccessories();
        } else {
          alert(res.data.message);
        }
      } else {
        // Add mode
        const res = await axios.post("http://127.0.0.1:5000/admin/accessories", formData);
        if (res.data.success) {
          alert("Accessory added successfully!");
          setIsModalOpen(false);
          fetchAccessories();
        } else {
          alert(res.data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save accessory.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Catalog Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Manage AI accessory recommendation inventory</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          Add Accessory
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((acc) => (
            <div
              key={acc.id}
              className="glass rounded-[24px] overflow-hidden border border-white/8 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 group"
            >
              
              {/* IMAGE HEADER */}
              <div className="h-48 relative overflow-hidden bg-black/40 border-b border-white/5">
                <img
                  src={acc.image || "https://images.unsplash.com/photo-1507136566006-cfc505b114fc"}
                  alt={acc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 badge-orange text-[10px] uppercase font-black">
                  {acc.damage_type}
                </div>
                {acc.rating && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 text-xs text-yellow-400 font-bold">
                    <Star size={12} fill="currentColor" />
                    <span>{acc.rating}</span>
                  </div>
                )}
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg leading-snug mb-2 line-clamp-1">{acc.name}</h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mb-4">{acc.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <span className="text-orange-400 font-black text-2xl">{acc.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(acc)}
                      className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-[28px] w-full max-w-lg border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
            
            {/* MODAL HEADER */}
            <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
              <h2 className="text-xl font-black text-white">
                {selectedAccessory ? "Edit Accessory" : "Add New Accessory"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* ACC NAME */}
              <div>
                <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Accessory Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Car Ceramic Coating Kit"
                  className="input-premium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* DUAL COLS: PRICE & RATING */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Price (INR)</label>
                  <input
                    type="text"
                    required
                    placeholder="₹1,999"
                    className="input-premium"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    className="input-premium"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              {/* IMAGE URL */}
              <div>
                <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input-premium"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* DAMAGE MAPPING DROPDOWN */}
              <div>
                <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Damage Category Map</label>
                <select
                  className="input-premium appearance-none bg-black/40 text-white rounded-xl"
                  value={formData.damage_type}
                  onChange={(e) => setFormData({ ...formData, damage_type: e.target.value })}
                >
                  {damageCategories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-neutral-900 text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs text-gray-400 font-bold uppercase mb-1.5">Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Provide accessory specifications and details..."
                  className="input-premium resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* SUBMIT */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-glass py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-3"
                >
                  {selectedAccessory ? "Save Changes" : "Create Accessory"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminAccessories;
