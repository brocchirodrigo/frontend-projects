import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import api from './services/api'

import './App.css'
import backgroudImage from './assets/photo-1603550413405-72f158527750.jpg'

/**
 * Principais conceitos React
 * Componente, propriedade e estado / imutabilidade
 */

function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])


    async function handlerAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`)
        //setProjects([...projects, `Novo projeto ${Date.now()}`])

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Rodrigo Brocchi"
        })

        const project = response.data

        setProjects([...projects, project])
        
    }
    //console.log(projects)

    return (
        <>
            <Header title="Projects" />

            <img width={300} src={backgroudImage}/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handlerAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;