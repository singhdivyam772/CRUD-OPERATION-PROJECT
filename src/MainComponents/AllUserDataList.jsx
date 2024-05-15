import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Loader from './Loader';

const AllUserDataList = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

//   get the data initailly and fetch to the setUsers
   useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users')
         .then(response => {
            setUsers(response.data);
            setLoading(false);
         })
         .catch(error => {
            setError(error.message);
            setLoading(false);
         });
   }, []);

   const deleteUser = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
         .then(response => {

            // if user id is not equal to the one which passes in args than expect that args id return all users and set to the setUsers 
            setUsers(users.filter(user => user.id !== id));
            toast.success("Deleted Successufully")
         })

         .catch(error => {
            setError('Error deleting user');
         });
   }
   return (
      <main className='flex flex-col justify-start mt-5 items-center w-full px-4 pb-10'>
         
         {
            loading 
            ? (
               <Loader/>
            ) 
            : (
            <div className='flex flex-col justify-start mt-5 items-center w-full px-4'>
            <h1 className='text-3xl text-blue-400 my-5 font-medium'>
               Our Company User Data
            </h1>
            <Link to="/create-user" className="text-blue-500 text-xl font-medium underline mb-4">
               Create New User
            </Link>
            <div className="overflow-x-auto w-full">
               <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                     <tr>
                     <th className="border border-gray-300 px-4 py-2">Sno.</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Edit</th>
                        <th className="border border-gray-300 px-4 py-2">Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map(user => (
                        <tr key={user.id}>
                           <td className="border border-gray-300 px-4 py-2">
                              {user.id}
                           </td>
                           <td className="border border-gray-300 px-4 py-2">
                              {user.name}
                           </td>
                           <td className="border border-gray-300 px-4 py-2">
                              {user.email}
                           </td>
                           <td className="border border-gray-300 px-4 py-2">
                              {user.phone}
                           </td>
                           <td className="border border-gray-300 px-4 py-2">
                              <Link to={`/edit-user/${user.id}`}>
                                 <Button className="mr-2">
                                    Edit
                                 </Button>
                              </Link>
                           </td>
                           <td className="border border-gray-300 px-4 py-2">
                              <Button
                                 variant="destructive"
                                 onClick={() => deleteUser(user.id)}>
                                 Delete
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>)
         }
      </main>
   );


};

export default AllUserDataList;
