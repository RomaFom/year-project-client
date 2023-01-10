import React, { useCallback, useState } from 'react';
import { useUser } from '@/providers/UserProvider';
import ProfileCard from './ProfileCard/ProfileCard';

const Profile: React.FC = () => {
    const { user } = useUser();
    return (
        <div>
            <ProfileCard />
        </div>
    );
};

export default Profile;
