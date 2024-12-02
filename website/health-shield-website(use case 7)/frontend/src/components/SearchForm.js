import React, { useState } from 'react';
import axios from '../services/api';
import Appointments from './Appointments';

function SearchForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [results, setResults] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/search`, {
                params: { name, location, specialty }
            });
            console.log('Search results:', response.data); // Debugging
            setResults(response.data);
            setSelectedDoctor(null); // Reset selected doctor on new search
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSelect = (doctor) => {
        console.log('Doctor selected:', doctor); // Debugging
        setSelectedDoctor(doctor);
    };

    return (
        <div>
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
            </form>

            <div className="search-results">
                {results.length > 0 ? (
                    results.map((doctor) => (
                        <div
                            key={doctor._id || doctor.id}
                            className="doctor-card"
                        >
                            <div>
                                <h4>{doctor.name}</h4>
                                <p>Location: {doctor.location}</p>
                                <p>Specialty: {doctor.specialty}</p>
                            </div>
                            <button
                                className="select-button"
                                onClick={() => handleSelect(doctor)}
                            >
                                Select
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>

            {selectedDoctor && (
                <Appointments selectedDoctor={selectedDoctor} />
            )}
        </div>
    );
}

export default SearchForm;
