import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/List.css';
import ClientAdd from './ClientAdd';
import ClientUpdate from './ClientUpdate';
import ClientDelete from './ClientDelete';

function ClientList() {
  const [client, setClient] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const response = await fetch('/api/client/list');

      if (response.ok) {
        const data = await response.json();
        setClient(data);
      } else {
        throw new Error('Failed to fetch clients');
      }
    } catch (error) {
      console.log('Error fetching clients:', error);
    }
  }

  return (
    <div className='container'>
      <div>
        <ul className='list'>
          <h1>Clientes</h1>
          {<ClientAdd refreshClientList={fetchClients} />}
          <hr></hr>
          <li className='list-header-client'>
            <h2>Nombre</h2>
            <h2>Apellido</h2>
            <h2>Email</h2>
          </li>
          {client.map((client) => (
            <li className='list-item-client' key={client.id}>
              <p>{client.name}</p>
              <p>{client.lastName}</p>
              <p>{client.email}</p>
              <p>
                {
                  <ClientUpdate
                    id={client.id}
                    clientData={client}
                    refreshClientList={fetchClients}
                  />
                }
              </p>
              <p>
                {
                  <ClientDelete
                    id={client.id}
                    clientData={client}
                    refreshClientList={fetchClients}
                  />
                }
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default ClientList;
