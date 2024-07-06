import React from 'react'
import TransactionInput from '@/components/TransactionInput'

const categories = [
    {id: '1', name: 'Food'},
    {id: '2', name: 'Rent'},
    {id: '3', name: 'Transportation'},
]

const page: React.FC = () => {
  return (
    <div className='container mx-auto p-4'>
        <TransactionInput title="Add Transaction" categories={categories}/>
    </div>
  )
}

export default page