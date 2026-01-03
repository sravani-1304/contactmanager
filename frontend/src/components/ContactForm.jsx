import { useState, useEffect } from "react";
import api from "./api";

function ContactForm({ onAdd, editingContact, onCancelEdit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editingContact) {
      setForm(editingContact);
    } else {
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  }, [editingContact]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingContact) {
      await api.put(`/contacts/${editingContact._id}`, form);
      setSuccess("Contact updated successfully!");
    } else {
      await api.post("/contacts", form);
      setSuccess("Contact added successfully!");
    }

    setForm({ name: "", email: "", phone: "", message: "" });
    onAdd();
    if (editingContact) onCancelEdit();
  };

  return (
    <div className="card">
      <h3>{editingContact ? "Edit Contact" : "Add New Contact"}</h3>

      {/* NAME */}
      <div className="form-group">
        <div className="label-row">
          <label>Name *</label>
          {errors.name && (
            <span className="error-inline">{errors.name}</span>
          )}
        </div>
        <input name="name" value={form.name} onChange={handleChange} />
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <div className="label-row">
          <label>Email *</label>
          {errors.email && (
            <span className="error-inline">{errors.email}</span>
          )}
        </div>
        <input name="email" value={form.email} onChange={handleChange} />
      </div>

      {/* PHONE */}
      <div className="form-group">
        <div className="label-row">
          <label>Phone *</label>
          {errors.phone && (
            <span className="error-inline">{errors.phone}</span>
          )}
        </div>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      {/* MESSAGE */}
      <div className="form-group">
        <label>Message (Optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>

      {editingContact && (
        <button onClick={onCancelEdit}>Cancel</button>
      )}

      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default ContactForm;
