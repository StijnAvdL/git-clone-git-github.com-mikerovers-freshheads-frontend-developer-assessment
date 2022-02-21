import { useState, useEffect } from 'react';

const GetCategories = () => {
  const [categories, setCategories] = useState([])

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

  return categories;
}

export default GetCategories;