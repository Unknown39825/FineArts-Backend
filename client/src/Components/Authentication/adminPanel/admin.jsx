import React from 'react';
import EventTable from './Tables/EventTable';
import HomeCardTable from './Tables/HomeCardTable';
import Base from '../../Base/Base';
import WorkShopTable from './Tables/WorkshopTable';
import UserTable from './Tables/UserTable';
import ContributorTable from './Tables/ContributorsTable';

const admin = () => {
    return (
        
        <Base>
            <EventTable/>
            <HomeCardTable/>
            <WorkShopTable/>
            <ContributorTable/>
            <UserTable/>
            
            {/* 
            <ContributorsTable/>
            <ProjectCardsTable/>
            <TutorialsTable/>
            {isAuthenticated()&&isAuthenticated().admin&&<UserTable/>} */}
        
        </Base>
    );
}

export default admin;
