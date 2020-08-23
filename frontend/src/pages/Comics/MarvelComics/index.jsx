import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { securityInformations, getComics } from '../../../services/marvelAxios';

import { Table } from './styles';

const Home = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const loadHeroes = async () => {
            const { data: serverData } = await axios.get(`${getComics}?${securityInformations}`);

            setComics(serverData.data.results);
        };

        loadHeroes();
    }, []);

    const handleAddFavoriteComic = (comic) => {
        console.log(comic);
    };

    console.log(comics);

    return (
        <div id="page-home">
            <div className="content">

                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comics
            && comics.map((comic) => (
                <tr key={comic.id}>
                    <td>{comic.title}</td>
                    <td>
                        <Link to={`/comics/${comic.id}`}>
                            <button type="button">View</button>
                        </Link>

                        <button type="button" onClick={() => handleAddFavoriteComic(comic)}>Favorite</button>
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
