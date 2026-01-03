import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import api from "./components/api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // 🌙 Load theme from localStorage (default: light)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🌙 Apply + persist theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🌙 Toggle theme (UI unchanged)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Contact Manager</h1>

        {/* UI SAME — ONLY LOGIC IMPROVED */}
        <button className="theme-toggle" onClick={toggleTheme}>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>

      </div>

      <div className="grid">
        <ContactForm
          onAdd={fetchContacts}
          editingContact={editingContact}
          onCancelEdit={() => setEditingContact(null)}
        />

        <ContactList
          contacts={contacts}
          onEdit={setEditingContact}
          refresh={fetchContacts}
        />
      </div>
    </div>
  );
}

export default App;
