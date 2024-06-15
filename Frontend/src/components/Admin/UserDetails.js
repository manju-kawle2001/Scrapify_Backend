import axios from 'axios';
import { Table } from 'flowbite-react'; // Assuming you have a Table component from a library
import React, { useEffect, useState } from 'react';
import Api from '../WebApi';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [unBlockList, setUnBlockList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/getUser-list');
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error('Invalid user data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      const confirmBlock = window.confirm('Are you sure you want to block the user?');
      if (!confirmBlock) return;

      const blockUrl = `${Api.blockUser}/${userId}`;
      await axios.put(blockUrl);

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            user.isBlock = true;
            setBlockList((prevList) => [...prevList, user]);
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error block user:', error);
    }
  };

  const handleToggleUnblock = async (userId) => {
    try {
      const confirmUnBlock = window.confirm('Are you sure you want to unblock the user?');
      if (!confirmUnBlock) return;

      const unBlockUrl = `${Api.unBlockUser}/${userId}`;
      await axios.put(unBlockUrl);

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            user.isBlock = false;
            setUnBlockList((prevList) => [...prevList, user]);
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error unblock user:', error);
    }
  };

  return (
    <>

      <div className="mt-2 overflow-x-auto">
        <Table>
          <Table.Head>
            <th className="px-5 py-3">ID</th>
            <th className="px-5 py-3">User Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-2 py-3">Contact Number</th>
            <th className="px-5 py-3">Block/Unblock</th>
          </Table.Head>

          <Table.Body className="divide-y">
            {users.length > 0 &&
              users.map((user, index) => (
                <Table.Row key={user._id} className="border-gray-700 bg-gray-800">
                  <Table.Cell className=" font-medium text-white">{index + 1}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.contact}</Table.Cell>
                  <Table.Cell>
                    {user.isBlock ? (
                      <button
                        className="rounded-full px-3 py-1 text-xs font-semibold bg-red-500 text-white"
                        onClick={() => handleToggleUnblock(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="rounded-full px-3 py-1 text-xs font-semibold bg-green-500 text-white"
                        onClick={() => handleToggleBlock(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

    </>
  );
};

export default UserDetails;
