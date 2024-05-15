import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateNewUser = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: ''
   });
   const navigate = useNavigate();

   // store the data while user enter the data
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData, //mainting previous data
         [name]: value
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://jsonplaceholder.typicode.com/users', formData)
         .then(response => {
            toast.success('User created successfully');
            navigate('/');
         })
         .catch(error => {
            toast.error('Error creating user');
         });

         // check the data
         console.log(formData);

   };

   return (
      <div className='w-screen flex flex-col justify-start my-5 mt-10 items-center'>

         <form onSubmit={handleSubmit} className=' md:w-[50%] w-full h-[60%] shadow-xl flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-medium text-blue-400'>
               Create User
            </h1>
            <label htmlFor='name' className=' w-[50%] my-5'>
               <p className=' text-2xl font-semibold '>
                  Name:
               </p>
               <input
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className=' h-9 w-[90%] rounded-md'
                  required
               />
            </label>
            <label htmlFor='email' className=' w-[50%] '>
               <p className=' text-2xl font-semibold '>
                  Email:
               </p>
               <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className=' h-9 w-[90%] rounded-md'
                  required
               />
            </label>
            <label htmlFor='phone' className=' w-[50%] my-5'>
               <p className=' text-2xl font-semibold '>
                  Phone:
               </p>
               <input
                  id='phone'
                  type='number'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className=' h-9 w-[90%] rounded-md'
                  required
               />
            </label>
            <Button
               type='submit'
               className="my-3 md:ml-8"
            >
               Create
            </Button>
         </form>
      </div>
   );
};

export default CreateNewUser;
