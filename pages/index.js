import { useState, useEffect } from 'react';
import NoteItem from '../components/NoteItem';

export default function Home() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome Note',
      description: 'Welcome to your sleek Next.js notebook! You can add, edit, or delete notes here.',
      category: 'Idea',
      date: new Date().toLocaleDateString(),
    },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Idea');
  const [search, setSearch] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Bonus 1: useEffect check for existing title in real-time
  useEffect(() => {
    const exists = notes.some(
      (note) => note.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    setIsDuplicate(title.trim().length > 0 && exists);
  }, [title, notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || isDuplicate) return;

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      date: new Date().toLocaleDateString(),
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setDescription('');
    setCategory('Idea');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleUpdateNote = (id, newTitle, newDescription, newCategory) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: newTitle, description: newDescription, category: newCategory }
          : note
      )
    );
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <main style={styles.container}>
        <header style={styles.header}>
          <span style={styles.logoBadge}>✨ NoteStudio</span>
          <h1 style={styles.title}>Your Creative Workspace</h1>
          <p style={styles.subtitle}>Organize your thoughts with style and ease</p>
        </header>

        {/* Create Note Section */}
        <section style={styles.cardForm}>
          <h2 style={styles.formTitle}>Create New Note</h2>
          <form onSubmit={handleAddNote} style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  ...styles.input,
                  borderColor: isDuplicate ? '#ef4444' : '#e2e8f0',
                }}
                required
              />
              {isDuplicate && (
                <span style={styles.errorBadge}>⚠️ A note with this title already exists!</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <textarea
                placeholder="Write your note contents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                required
              />
            </div>

            <div style={styles.formFooter}>
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

              <button
                type="submit"
                disabled={isDuplicate || !title || !description}
                style={{
                  ...styles.addBtn,
                  opacity: isDuplicate || !title || !description ? 0.5 : 1,
                  cursor: isDuplicate || !title || !description ? 'not-allowed' : 'pointer',
                }}
              >
                + Add Note
              </button>
            </div>
          </form>
        </section>

        {/* Filter and Notes Grid */}
        <section style={styles.notesSection}>
          <div style={styles.sectionHeader}>
            <h2>All Notes ({filteredNotes.length})</h2>
            <input
              type="text"
              placeholder="🔍 Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {filteredNotes.length === 0 ? (
            <div style={styles.emptyState}>
              <p>🌱 No notes found. Add one above to get started!</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleUpdateNote}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f6f8fd 0%, #e9eeed 100%)',
    padding: '40px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  container: { maxWidth: '960px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  logoBadge: {
    background: '#6366f1',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '6px 16px',
    borderRadius: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  title: { fontSize: '2.5rem', color: '#0f172a', margin: '16px 0 8px 0', fontWeight: '800' },
  subtitle: { color: '#64748b', fontSize: '1.1rem', margin: 0 },
  cardForm: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    marginBottom: '40px',
  },
  formTitle: { fontSize: '1.25rem', margin: '0 0 20px 0', color: '#1e293b' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
  },
  errorBadge: { color: '#ef4444', fontSize: '0.85rem', fontWeight: '600' },
  formFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  select: {
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '0.95rem',
  },
  addBtn: {
    backgroundColor: '#6366f1',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
  },
  notesSection: { marginTop: '20px' },
  sectionHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    width: '240px',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8',
    fontSize: '1.1rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
  },
};