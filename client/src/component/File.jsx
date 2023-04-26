import React, { useState } from 'react';

const ContactTable = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if name or contact number already exists
    const alreadyExists = people.some((person) => person.name === name || person.contactNumber === contactNumber);

    if (alreadyExists) {
      alert('Name or contact number already exists!');
    } else {
      setPeople([...people, { name, contactNumber, email, address }]);
      setName('');
      setContactNumber('');
      setEmail('');
      setAddress('');
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      const newPeople = [...people];
      newPeople.splice(index, 1);
      setPeople(newPeople);
    }
  };

  const handleSort = () => {
    const sortedPeople = [...people].sort((a, b) => a.name.localeCompare(b.name));
    setPeople(sortedPeople);
  };

  const filteredPeople = people.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <button type="submit">Save</button>
      </form>

      <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.contactNumber}</td>
              <td>{person.email}</td>
              <td>{person.address}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
