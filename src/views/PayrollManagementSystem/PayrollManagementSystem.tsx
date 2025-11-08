import React from 'react'
import Header from '../../components/PayrollManagementSystem/Header'
import MainLayout from "../../components/layout/MainLayout";
import Management from '../../components/PayrollManagementSystem/Management';

const PayrollManagementSystem = () => {
  return (
    <MainLayout>
    <div className="">
    <Header/>
    <Management/>
    </div>
    </MainLayout>
  )
}

export default PayrollManagementSystem