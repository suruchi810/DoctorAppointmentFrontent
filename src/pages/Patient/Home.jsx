import Banner from '@/components/Patient/Banner'
import TopDoctors from '@/components/Patient/TopDoctors'
import React from 'react'
import SpecialityMenu from './SpecialityMenu'
import Header from '@/components/Patient/Header'

const Home = () => {
  return (
    <>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </>
  )
}

export default Home