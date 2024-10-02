import React from 'react'
import Header from './components/Header'
import SpecialityMenu from './components/SpecialityMenu'
import TopDoctors from './components/TopDoctors'
import Banner from './components/Banner'

function Home() {
  return (
    <div>
        <div>
          <Header />
        </div>
        <div>
          <SpecialityMenu />
        </div>
        <div>
          <TopDoctors docrows={8}/>
        </div>  
        <div>
          <Banner />
        </div>
    </div>
  )
}

export default Home