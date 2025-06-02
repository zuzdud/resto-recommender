import { useEffect, useState } from 'react';

function ProfilePage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwt');
            const res = await fetch('/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setProfile(data);
        };

        fetchProfile();
    }, []);

    if (!profile) return <p>Ładowanie profilu...</p>;

    return (
        <div>
            <h2>Profil: {profile.name}</h2>
            <p>Email: {profile.email}</p>
        </div>
    );
}

export default ProfilePage;