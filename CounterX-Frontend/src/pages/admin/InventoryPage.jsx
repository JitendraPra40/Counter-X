import { useState, useEffect } from 'react';
import { Menu, Plus, Edit2, Trash2, X } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '../../api/admin';
import './AdminPages.css';

const CATEGORIES = ['VEGETABLE', 'FRUIT', 'DAIRY', 'GRAINS', 'PULSES', 'SPICES', 'OIL', 'BEVERAGE', 'MEAT', 'SEAFOOD', 'BAKERY', 'FROZEN_FOOD', 'PACKAGING', 'CLEANING_SUPPLIES', 'OTHER'];
const UNIT_TYPES = ['KG', 'GRAM', 'LTR', 'ML', 'PCS', 'PACK', 'BOX', 'BOTTLE', 'TRAY'];
const EMPTY_FORM = { itemName: '', category: 'VEGETABLE', unitType: 'KG', availableStock: '', pricePerUnit: '', receivedDate: '', createdBy: '' };

export default function InventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = () => {
    setLoading(true);
    getInventory().then(r => setItems(r.data || [])).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ itemName: item.itemName, category: item.category, unitType: item.unitType, availableStock: item.availableStock, pricePerUnit: item.pricePerUnit, receivedDate: item.receivedDate?.substring(0, 10) || '', createdBy: item.createdBy || '' });
    setError(''); setModal(true);
  };
  const closeModal = () => { setModal(false); setEditItem(null); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...form, availableStock: parseFloat(form.availableStock), pricePerUnit: parseFloat(form.pricePerUnit) };
      if (editItem) await updateInventoryItem(editItem.id, payload);
      else await createInventoryItem(payload);
      closeModal(); fetchItems();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save inventory item.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.itemName}"?`)) return;
    try { await deleteInventoryItem(item.id); fetchItems(); } catch { }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="inventory-sidebar-btn"><Menu size={20} /></button>
          <div>
            <h1 className="admin-topbar__title">Inventory</h1>
            <p className="admin-topbar__sub">{items.length} items in stock</p>
          </div>
          <button className="btn btn-primary" onClick={openAdd} id="add-inventory-btn">
            <Plus size={16} /> Add Item
          </button>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : (
          <div className="table-wrapper">
            <table className="cx-table">
              <thead>
                <tr><th>Item</th><th>Category</th><th>Unit</th><th>Stock</th><th>Price/Unit</th><th>Received</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>{item.itemName}</td>
                    <td><span className="badge badge-info">{item.category}</span></td>
                    <td>{item.unitType}</td>
                    <td>
                      <span style={{ color: item.availableStock < 10 ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: 700 }}>
                        {item.availableStock}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{item.pricePerUnit?.toFixed(2)}</td>
                    <td style={{ color: 'var(--color-text-3)', fontSize: '0.85rem' }}>{item.receivedDate?.substring(0, 10)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(item)} id={`edit-inv-${item.id}`}><Edit2 size={15} /></button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(item)} id={`delete-inv-${item.id}`}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editItem ? 'Edit Inventory Item' : 'Add Inventory Item'}</h3>
              <button className="modal-close btn-icon" onClick={closeModal}><X size={18} /></button>
            </div>
            <form className="admin-form" onSubmit={handleSave} id="inventory-form">
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Item Name *</label>
                  <input className="form-control" required value={form.itemName} onChange={e => setForm(f => ({ ...f, itemName: e.target.value }))} placeholder="e.g. Onion" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Unit Type *</label>
                  <select className="form-control" value={form.unitType} onChange={e => setForm(f => ({ ...f, unitType: e.target.value }))}>
                    {UNIT_TYPES.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Available Stock *</label>
                  <input className="form-control" type="number" min="0" step="0.01" required value={form.availableStock} onChange={e => setForm(f => ({ ...f, availableStock: e.target.value }))} placeholder="150.5" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Price per Unit (₹) *</label>
                  <input className="form-control" type="number" min="0.01" step="0.01" required value={form.pricePerUnit} onChange={e => setForm(f => ({ ...f, pricePerUnit: e.target.value }))} placeholder="40.00" />
                </div>
                <div className="form-group">
                  <label className="form-label">Received Date *</label>
                  <input className="form-control" type="date" required value={form.receivedDate} onChange={e => setForm(f => ({ ...f, receivedDate: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Created By</label>
                <input className="form-control" value={form.createdBy} onChange={e => setForm(f => ({ ...f, createdBy: e.target.value }))} placeholder="Admin name" />
              </div>
              {error && <div className="alert alert-error">{error}</div>}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving} id="save-inventory-btn">
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
