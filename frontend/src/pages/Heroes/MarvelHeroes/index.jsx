import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getHeroes, securityInformations } from '../../../services/marvelAxios';

import { Table } from './styles';

const Home = () => {
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        const loadHeroes = async () => {
            const { data: serverData } = await axios.get(`${getHeroes}?${securityInformations}`);

            setHeroes(serverData.data.results);
        };

        loadHeroes();
    }, []);

    console.log(heroes);

    return (
        <div id="page-home">
            <div className="content">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes
            && heroes.map((heroe) => (
                <tr key={heroe.id}>
                    <td>{heroe.name}</td>
                    <td>{heroe.description}</td>
                    <td>
                        <Link to={`/heroes/${heroe.id}`}>
                            <button type="button">View</button>
                        </Link>

                        <button type="button">Favorite</button>
                    </td>
                </tr>
            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Home;
