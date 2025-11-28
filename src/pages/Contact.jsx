import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    // Nom
    if (!form.name.trim()) {
      newErrors.name = "Le nom est obligatoire.";
      isValid = false;
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "L'email est obligatoire.";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Format d'email invalide.";
      isValid = false;
    }

    // Message
    if (!form.message.trim()) {
      newErrors.message = "Le message est obligatoire.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    // Si tout est OK :
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-[1300px] mx-auto p-5 flex justify-center">
      <div className="w-full max-w-[600px]">

        <h1 className="text-yellow-500 text-[35px] mb-[25px] border-[#2e7d32] pl-[10px] uppercase tracking-[1px]">
          Contactez-Nous
        </h1>

        {success && (
          <p className="text-green-600 font-semibold mb-4 text-center">
            Message envoyé avec succès !
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NOM */}
          <div>
            <input
              className={`p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-[5px] w-full`}
              placeholder="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              className={`p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-[5px] w-full`}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              className={`p-2 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-[5px] w-full h-[200px] resize-none`}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <button className="p-[10px] bg-yellow-500 text-white rounded-[5px] cursor-pointer hover:bg-yellow-500">
            Envoyer
          </button>
        </form>

      </div>
    </div>
  );
}