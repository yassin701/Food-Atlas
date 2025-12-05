import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const formRef = useRef();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    emailjs
      .sendForm(
         import.meta.env.VITE_EMAILJS_SERVICE_ID,
         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
      .then(() => {
        toast.success("Message sent successfully!");
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        formRef.current.reset();
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch((error) => {
        toast.error("Failed to send message. Try again!");
      });
  };

  return (
    <div className="max-w-[1300px] mx-auto p-5 flex justify-center">
      <div className="w-full max-w-[600px]">

        <h1 className="text-yellow-500 text-[35px] mb-[25px]">Contact Us</h1>

        {success && (
          <p className="text-green-600 font-semibold mb-4 text-center">
            Message sent successfully!
          </p>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <input
              name="name"
              className={`p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-[5px] w-full`}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              className={`p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-[5px] w-full`}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              className={`p-2 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-[5px] w-full h-[200px] resize-none`}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button className="p-2.5 bg-yellow-500 text-white rounded-[5px] hover:bg-yellow-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
