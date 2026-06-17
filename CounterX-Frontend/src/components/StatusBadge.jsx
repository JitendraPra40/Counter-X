export default function StatusBadge({ status }) {
  const labels = {
    pending: 'Pending',
    preparing: 'Preparing',
    ready: 'Ready',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <span className={`badge ${status}`}>
      {status === 'pending' && '⏳ '}
      {status === 'preparing' && '🔥 '}
      {status === 'ready' && '✓ '}
      {status === 'completed' && '★ '}
      {status === 'cancelled' && '✕ '}
      {labels[status] || status}
    </span>
  );
}
