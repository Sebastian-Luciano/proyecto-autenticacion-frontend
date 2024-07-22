import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import PhotoUpload from '../components/PhotoUpload';

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    phone: user.phone || '',
    email: user.email || '',
    password: '',
  });
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(user.photo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos del formulario antes de enviar:", formData);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'password' || formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (photo) {
        formDataToSend.append('photo', photo);
      }
      const updatedUser = await updateUser(formDataToSend);
      setCurrentPhoto(updatedUser.user.photo);
      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto border border-gray-300 rounded-3xl py-5 pl-10 pr-80 ">
        <h1 className="text-4xl font-bold mb-4">Change Info</h1>
        <p className="mb-8">Changes will be reflected to every services</p>
        
        <form onSubmit={handleSubmit} className={`space-y-6`}>
          <PhotoUpload currentPhoto={currentPhoto} onPhotoChange={setPhoto} name={formData.name} />
          
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextAreaField  label="Bio" name="bio" value={formData.bio} onChange={handleChange} />
          <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          <InputField label="Password" name="password" value={formData.password}  onChange={handleChange} type="password" />

          <div>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className=" text-gray-800 w-full border border-gray-400 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      id={name}
      rows="3"
      value={value}
      onChange={onChange}
      className="text-gray-800 w-full border border-gray-400 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
  </div>
);
