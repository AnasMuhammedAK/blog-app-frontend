import React from 'react';

const UsersListHeader = ({users}) => {
	return (
		<div className=' relative bg-indigo-800'>
			<div className='absolute inset-0'>
				<img
					className='w-full h-full object-cover'
					src='https://www.delaconcorp.com/india/wp-content/uploads/sites/17/2021/02/new-user-management-banner.jpg'
					alt=''
				/>
				<div
					className='absolute inset-0 bg-indigo-800 mix-blend-multiply'
					aria-hidden='true'
				/>
			</div>
			<div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
				<h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mt-10'>
					Authors List - {users?.length}
				</h1>
				<p className='mt-6 text-xl text-indigo-100 max-w-3xl'>
					Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque
					lacus nisi urna, arcu sociis eu. Orci vel lectus nisl eget eget ut
					consectetur. Sit justo viverra non adipisicing elit distinctio.
				</p>
			</div>
		</div>
	);
};

export default UsersListHeader;