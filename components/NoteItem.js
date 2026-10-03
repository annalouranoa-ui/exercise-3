import React, { useState } from 'react';

export default function NoteItem({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [category, setCategory] = useState(note.category || 'Idea');

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;
    onUpdate(note.id, title, description, category);
    setIsEditing(false);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Work': return '#3b82f6';
      case 'Personal': return '#ec4899';
      case 'Urgent': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${getCategoryColor(category)}` }}>
      {isEditing ? (
        <div style={styles.editForm}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...styles.input, height: '80px', resize: 'vertical' }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="Idea">💡 Idea</option>
            <option value="Work">💼 Work</option>
            <option value="Personal">🏠 Personal</option>
            <option value="Urgent">🚨 Urgent</option>
          </select>
          <div style={styles.buttonGroup}>
            <button onClick={handleSave} style={styles.saveBtn}>✨ Save</button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={styles.cardContent}>
          <div>
            <div style={styles.cardHeader}>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: `${getCategoryColor(category)}20`,
                  color: getCategoryColor(category),
                }}
              >
                {category}
              </span>
              <span style={styles.date}>{note.date}</span>
            </div>
            <h3 style={styles.title}>{note.title}</h3>
            <p style={styles.description}>{note.description}</p>
          </div>
          <div style={styles.buttonGroup}>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>✏️ Edit</button>
            <button onClick={() => onDelete(note.id)} style={styles.deleteBtn}>🗑️ Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardContent: { display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  badge: { fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' },
  date: { fontSize: '0.75rem', color: '#94a3b8' },
  title: { margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' },
  description: { margin: '0 0 20px 0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' },
  editForm: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '0.95rem',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
  },
  buttonGroup: { display: 'flex', gap: '8px', marginTop: 'auto' },
  editBtn: { background: '#f1f5f9', color: '#334155', border: 'none', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
  deleteBtn: { background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
  saveBtn: { background: '#6366f1', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
  cancelBtn: { background: '#e2e8f0', color: '#475569', border: 'none', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
};