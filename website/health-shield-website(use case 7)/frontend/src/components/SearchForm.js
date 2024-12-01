import React, { useState } from 'react';
import axios from '../services/api';

function SearchForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/search`, {
                params: { name, location, specialty }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Enter Doctor's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select Location</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
            </select>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">Select Specialty</option>
                <option value="Neurology">Neurology</option>
                <option value="Cardiology">Cardiology</option>
            </select>
            <button type="submit">Search</button>

            <div className="search-results">
                {results.map((doctor) => (
                    <div key={doctor._id}>
                        <h4>{doctor.name}</h4>
                        <p>Location: {doctor.location}</p>
                        <p>Specialty: {doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </form>
    );
}

export default SearchForm;
