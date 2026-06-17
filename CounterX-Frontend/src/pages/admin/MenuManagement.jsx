import { useState, useEffect } from 'react';
import { Menu, Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleMenuAvailability } from '../../api/menu';
import './AdminPages.css';

const EMPTY_FORM = { itemName: '', description: '', price: '', category: 'MEALS', available: true, imagePath: '' };
const CATEGORIES = ['BREAKFAST', 'MEALS', 'SNACKS', 'DRINKS', 'DESSERT'];

export default function MenuManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  const fetchItems = () => {
    setLoading(true);
    getAllMenuItems().then(r => setItems(r.data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openAdd  = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ itemName: item.itemName, description: item.description, price: item.price, category: item.category, available: item.available, imagePath: item.imagePath || '' });
    setError(''); setModal(true);
  };
  const closeModal = () => { setModal(false); setEditItem(null); setForm(EMPTY_FORM); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      if (editItem) await updateMenuItem(editItem.id, payload);
      else await addMenuItem(payload);
      closeModal(); fetchItems();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save item.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.itemName}"?`)) return;
    try { await deleteMenuItem(item.id); fetchItems(); } catch {}
  };

  const handleToggle = async (item) => {
    try { await toggleMenuAvailability(item.itemName, !item.available); fetchItems(); } catch {}
  };

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="menu-mgmt-sidebar-btn"><Menu size={20} /></button>
          <div>
            <h1 className="admin-topbar__title">Menu Management</h1>
            <p className="admin-topbar__sub">{items.length} items in menu</p>
          </div>
          <button className="btn btn-primary" onClick={openAdd} id="add-menu-item-btn">
            <Plus size={16} /> Add Item
          </button>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : (
          <div className="table-wrapper">
            <table className="cx-table">
              <thead>
                <tr>
                  <th>Item</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {item.imagePath
                          ? <img src={item.imagePath} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                          : <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🍽️</div>
                        }
                        <div>
                          <p style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>{item.itemName}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-primary">{item.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{item.price?.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleToggle(item)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} id={`toggle-${item.id}`}>
                        {item.available
                          ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-success)', fontSize: '0.82rem', fontWeight: 700 }}><ToggleRight size={18} /> Available</span>
                          : <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-danger)', fontSize: '0.82rem', fontWeight: 700 }}><ToggleLeft size={18} /> Unavailable</span>
                        }
                      </button>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(item)} id={`edit-menu-${item.id}`}><Edit2 size={15} /></button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(item)} id={`delete-menu-${item.id}`}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editItem ? 'Edit Item' : 'Add Menu Item'}</h3>
              <button className="modal-close btn-icon" onClick={closeModal}><X size={18} /></button>
            </div>
            <form className="admin-form" onSubmit={handleSave} id="menu-item-form">
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Item Name *</label>
                  <input className="form-control" required value={form.itemName} onChange={e => setForm(f => ({ ...f, itemName: e.target.value }))} placeholder="e.g. Paneer Tikka" />
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input className="form-control" type="number" min="1" step="0.01" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="220.00" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-control" rows={2} required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the dish..." />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Available</label>
                  <select className="form-control" value={form.available} onChange={e => setForm(f => ({ ...f, available: e.target.value === 'true' }))}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input className="form-control" value={form.imagePath} onChange={e => setForm(f => ({ ...f, imagePath: e.target.value }))} placeholder="https://example.com/image.jpg" />
              </div>
              {error && <div className="alert alert-error">{error}</div>}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving} id="save-menu-btn">
                  {saving ? 'Saving…' : editItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
