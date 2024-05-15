import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const UpdateUserInfo = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [user, setUser] = useState({
      name: '',
      email: '',
      phone: ''
   });

   // initalise only the data which pass through the id
   useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
         .then(response => {
            setUser(response.data);
         })
         .catch(error => {
            setMessage('Error fetching user data');
         });
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser(({
         ...prevState,
         [name]: value
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
         .then(response => {
            toast.success('User updated successfully');
            navigate('/');
         })
         .catch(error => {
            toast.error('Error updating user');
         });
   };

   return (
      <div className='w-screen h-screen flex flex-col justify-start my-12 items-center'>
         <form onSubmit={handleSubmit} className=' md:w-[50%] w-full h-[60%] shadow-xl flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-medium text-blue-400'>
               Edit User
            </h1>
            <label htmlFor='name' className=' w-[50%] my-5'>
               <p className=' text-2xl font-semibold ' >
                  Name:
               </p>
               <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className=' h-9 w-[90%] rounded-md'
                  required
               />
            </label>
            <label htmlFor='phone' className=' w-[50%] my-5'>
               <p className=' text-2xl font-semibold '>
                  Email
               </p>
               <input
                  type="email"
                  name="email"
                  value={user.email}
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
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className=' h-9 w-[90%] rounded-md'
                  required
               />
            </label>
            <Button
               type='submit'
               className="mb-6 md:ml-8"
            >
               Update
            </Button>
         </form>
      </div>
   );
};

export default UpdateUserInfo;
