// Suggestions.jsx

import React, { useEffect, useState } from 'react';
import style from './suggestion.module.css'

const Suggestions = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', age: 25, imageUrl: 'https://picsum.photos/200/300' },
    { id: 2, name: 'User 2', email: 'user2@example.com', age: 28, imageUrl: 'https://picsum.photos/200/300' },
    { id: 3, name: 'User 3', email: 'user3@example.com', age: 22, imageUrl: 'https://picsum.photos/200/300' },
    { id: 4, name: 'User 3', email: 'user3@example.com', age: 22, imageUrl: 'https://picsum.photos/200/300' },
    { id: 5, name: 'User 3', email: 'user3@example.com', age: 22, imageUrl: 'https://picsum.photos/200/300' },
    { id: 6, name: 'User 3', email: 'user3@example.com', age: 22, imageUrl: 'https://picsum.photos/200/300' },
    { id: 7, name: 'User 3', email: 'user3@example.com', age: 22, imageUrl: 'https://picsum.photos/200/300' },
    // Add more profile data as needed
  ]);


  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        console.log(data);
      } else {
        // Authentication failed
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleConnect = (id) => {
    // Implement your connect logic here
    console.log(`Connect with user ${id}`);
  };

  useEffect(()=>{
    fetchUsers()
  }, [])

  return (
    <div className={style.suggestions_container}>
      <h2>Suggested Profiles</h2>
      <div className={style.profile_list}>
        {profiles.map((profile) => (
          <div key={profile.id} className={style.profile_card_list}>
            <img src={profile.imageUrl} alt={profile.name} />
            <div className={style.profile_info_list}>
              <h3>{profile.name}</h3>
              <p>Email: {profile.email}</p>
              <p>Age: {profile.age}</p>
            </div>
            <div className={style.connect_button}>
              <button onClick={() => handleConnect(profile.id)}>Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
