import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/solid';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from '@material-tailwind/react';

TimeAgo.addLocale(en);

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
];

const TABLE_HEAD = ['User', 'User Type', 'Access Level', 'Employed', 'Actions'];

function MembersTable() {
  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users
    ? users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Card className='w-[1200px] h-full mx-auto mb-10'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='flex items-center justify-between gap-8 mb-8'>
            <div>
              <Typography variant='h5' color='blue-gray'>
                Members list
              </Typography>
              <Typography color='gray' className='mt-1 font-normal'>
                See information about all members
              </Typography>
            </div>
            <div className='flex flex-col gap-2 shrink-0 sm:flex-row'>
              <Button className='flex items-center gap-3' size='sm'>
                <UserPlusIcon strokeWidth={2} className='w-4 h-4' /> Add member
              </Button>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <Tabs value='all' className='w-full md:w-max'>
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className='w-full md:w-72'>
              <Input
                label='Search'
                icon={<MagnifyingGlassIcon className='w-5 h-5' />}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className='px-0 overflow-hidden overflow-scroll'>
          <table className='w-full mt-4 text-left table-auto min-w-max'>
            <thead>
              <tr>
                {TABLE_HEAD.map(head => (
                  <th
                    key={head}
                    className='p-4 border-y border-blue-gray-100 bg-blue-gray-50/50'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal leading-none opacity-70'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(
                ({
                  _id,
                  name,
                  email,
                  userType,
                  org,
                  isAdmin,
                  createdAt,
                  img,
                }) => (
                  <tr key={_id}>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <div className='flex items-center gap-3'>
                        <Avatar
                          src={
                            img ||
                            'https://docs.material-tailwind.com/img/face-2.jpg'
                          }
                          alt={name}
                          size='sm'
                        />
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70'
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {userType}
                        </Typography>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal opacity-70'
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <div className='w-max'>
                        <Chip
                          variant='ghost'
                          size='sm'
                          value={isAdmin ? 'Admin' : 'User'}
                          color={isAdmin ? 'green' : 'yellow'}
                        />
                      </div>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        <ReactTimeAgo date={createdAt} />
                      </Typography>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <Button className='h-[30px] px-auto pb-[25px] bg-red-600'>
                        Delete
                      </Button>
                      <Button className='ml-5 h-[30px] px-auto pb-[25px] bg-blue-600'>
                        Update
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default MembersTable;
