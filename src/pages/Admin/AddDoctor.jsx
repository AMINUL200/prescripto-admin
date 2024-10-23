import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  // Step 1: Initialize formData state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '1',
    fees: '',
    speciality: 'General physician',
    education: '',
    address1: '',
    address2: '',
    about: '',
    image: null,
  });

  const { backendUrl, aToken } = useContext(AdminContext);

  // Step 2: Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.image) {
        return toast.error("Please select an image")
      }

      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('fess', Number(formData.fees));
      formDataToSend.append('about', formData.about);
      formDataToSend.append('speciality', formData.speciality);
      formDataToSend.append('degree', formData.education);
      formDataToSend.append('address', JSON.stringify({ line1: formData.address1, line2: formData.address2 }));


      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formDataToSend, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setFormData({
          name: '',
          email: '',
          password: '',
          experience: '1',
          fees: '',
          speciality: 'General physician',
          education: '',
          address1: '',
          address2: '',
          about: '',
          image: null,
        })
      } else {
        toast.error(data.message)
      }

    } catch (e) {
      toast.error(e.message)
      console.error(e)
    }



  };

  return (
    <form onSubmit={handleSubmit} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={formData.image ? URL.createObjectURL(formData.image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id="doc-img" hidden onChange={handleFileChange} />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            {/* left Section */}
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                name="name"
                placeholder='Name'
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input
                className='border rounded px-3 py-2'
                type="email"
                name="email"
                placeholder='Email'
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input
                className='border rounded px-3 py-2'
                type="password"
                name="password"
                placeholder='Password'
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select
                className='border rounded px-3 py-2'
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select Experience</option>
                {[...Array(10).keys()].map((exp) => (
                  <option key={exp} value={exp + 1}>{exp + 1} Year{exp > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input
                className='border rounded px-3 py-2'
                type="number"
                name="fees"
                required
                placeholder='Fees'
                value={formData.fees}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            {/* right section */}
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                className='border rounded px-3 py-2'
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                name="education"
                required
                placeholder='Education'
                value={formData.education}
                onChange={handleChange}
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                name="address1"
                required
                placeholder='Address 1'
                value={formData.address1}
                onChange={handleChange}
              />
              <input
                className='border rounded px-3 py-2'
                type="text"
                name="address2"
                required
                placeholder='Address 2'
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className=''>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea
            className='w-full px-4 pt-2 border rounded'
            name="about"
            required
            placeholder='Write about doctor'
            rows={5}
            value={formData.about}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type='submit' className='bg-primary px-10 py-3 text-white rounded-full'>Add doctor</button>
      </div>
    </form>
  );
}

export default AddDoctor;
