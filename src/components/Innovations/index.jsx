import {useState, useEffect} from 'react';
import _ from "underscore"

const Innovations = () => {
    const [innovations, setInnovations] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(0)

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

    // fetch all tags
    useEffect(() => {
        async function fetchCategories() {     
            let tags = await fetch('http://localhost:3001/tags')
            tags = await tags.json()

            // add categorie all for displaying all items
            tags.unshift({"id": 0, "tag": "Alle"})
            setCategories(tags)
        }  

        fetchCategories()
    }, [])

    return (
        <>
            Categorie: <select onChange={e => setCategory(parseInt(e.target.value))}>
                {categories.map((category) => (
                    <option value={category.id}>{category.tag}</option>
                ))}
            </select>

            <hr/>

            {innovations.map((innovation) => (
                <>
                    <div>{innovation.title}</div>
                    <div>{innovation.user ? innovation.user.givenName : "unknown"}</div>
                    <div>Tag: {_.filter(categories, (cat) => innovation.category === cat.id)[0].tag}</div>
                    <hr/>
                </>
            ))}
        </>
    );
};

export default Innovations;
