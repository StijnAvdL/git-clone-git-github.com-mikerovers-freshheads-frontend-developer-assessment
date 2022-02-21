import {useState, useEffect} from 'react';
import _ from "underscore"
import GetCategories from "../../hooks/Categories"

const Innovations = () => {
    const [innovations, setInnovations] = useState([])
    const [category, setCategory] = useState(0)

    const categories = GetCategories();

    useEffect(() => {
        async function fetchInnovations() {
            // fetch all users
            let users = await fetch('http://localhost:3001/users')
            users = await users.json()

            // fetch all innovations
            let url = 'http://localhost:3001/innovations?_sort=createdAt&_order=desc';
            if(category) url = `${url}&category=${category}`
            let innovationsData = await fetch(url)
            innovationsData = await innovationsData.json()

            // link innovation to user
            innovationsData.forEach ((innovation, index) => {
                let user = _.find(users, (user) => user.id === innovation.user_id);
                innovationsData[index] = {...innovation, user }
            })

            console.log("innovationsData", innovationsData)

            setInnovations(innovationsData)
        }  

        fetchInnovations()
    }, [category])   

    return (
        <div className='innovations'>
            <div className='header'>
                <h1 className='title'>{`Innovatie(s) ${innovations.length}`}</h1>

                <div className='categories'>
                    Categorie: <select onChange={e => setCategory(parseInt(e.target.value))}>
                        {categories.map((category) => (
                            <option value={category.id}>{category.tag}</option>
                        ))}
                    </select>
                </div>
            </div>
                
            <div className='container'>
                {innovations.map((innovation) => (
                    <div className='item'>
                        <div className='paper'>
                            <div className='tag'>{_.filter(categories, (cat) => innovation.category === cat.id)[0].tag}</div>
                            <div className='title'>{innovation.title}</div>
                            <div className='user'>
                                {innovation.user && (<img className='picture' src={innovation.user.avatar} alt={innovation.user.avatar} />)}
                                <div className='name'>{innovation.user?.displayName || 'Onbekend'}</div>
                                <div className='job-title'>{innovation.user ? `${innovation.user.jobTitle} @ ${innovation.user.companyName}` : null}</div>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Innovations;
