import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHeroes, securityInformations } from '../../../services/marvelAxios';

const OneHeroe = ({ match }) => {
    const [heroe, setHeroe] = useState([]);

    useEffect(() => {
        const loadHeroes = async () => {
            const { data: serverData } = await axios.get(`${getHeroes}/${match.params.id}?${securityInformations}`);

            setHeroe(serverData.data.results);
        };

        loadHeroes();
    }, []);

    console.log(heroe);

    return (
        <div id="page-home">
            <div className="content">
                <h1>Not yet implemented. More informations in console</h1>
            </div>
        </div>
    );
};

export default OneHeroe;
