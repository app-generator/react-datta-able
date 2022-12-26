import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,
  Badge, Breadcrumb,  Table } from 'react-bootstrap';
import Pagination from './Pagination'
import axios from 'axios'
import Posts from './components/Posts'
function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  useEffect(() => {

    function changePage(url) {

      const changePage = async () => {
        setLoading(true)
        const res = await axios.get(url)
        setPosts(res.data)
        console.log()
        setLoading(false)
      }

      
    }

    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      console.log({
        "count": 12,
        "next": "http://localhost:8000/api/user/?page=2",
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/user/39/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario9",
                "first_name": "usu9",
                "last_name": "ario",
                "email": "usu9@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/2/"
            },
            {
                "url": "http://localhost:8000/api/user/29/",
                "last_login": null,
                "is_superuser": false,
                "username": "Franco",
                "first_name": "",
                "last_name": "",
                "email": "",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-11-16T17:07:42.978618Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/30/",
                "last_login": null,
                "is_superuser": false,
                "username": "Franc",
                "first_name": "",
                "last_name": "",
                "email": "",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-11-16T17:09:19.477106Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/28/",
                "last_login": "2022-12-26T05:12:16.556120Z",
                "is_superuser": true,
                "username": "ngen",
                "first_name": "ngen",
                "last_name": "ngen",
                "email": "ngen@ngen.com",
                "is_staff": true,
                "is_active": true,
                "date_joined": "2022-04-02T22:52:32.851000Z",
                "api_key": null,
                "priority": "http://localhost:8000/api/administration/priority/2/"
            },
            {
                "url": "http://localhost:8000/api/user/31/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario1",
                "first_name": "usu1",
                "last_name": "ario",
                "email": "usu1@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/32/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario2",
                "first_name": "usu2",
                "last_name": "ario",
                "email": "usu2@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/33/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario3",
                "first_name": "usu3",
                "last_name": "ario",
                "email": "usu3@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/34/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario4",
                "first_name": "usu4",
                "last_name": "ario",
                "email": "usu4@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/35/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario5",
                "first_name": "usu5",
                "last_name": "ario",
                "email": "usu5@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/3/"
            },
            {
                "url": "http://localhost:8000/api/user/36/",
                "last_login": "2022-12-19T02:14:00Z",
                "is_superuser": false,
                "username": "usuario6",
                "first_name": "usu6",
                "last_name": "ario",
                "email": "usu6@gmail.com",
                "is_staff": false,
                "is_active": false,
                "date_joined": "2022-12-20T02:15:00Z",
                "api_key": "",
                "priority": "http://localhost:8000/api/administration/priority/6/"
            }
        ]
    })
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading && posts.length === 0) {
    return <h2>Loading...</h2>
  }
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const howManyPages = Math.ceil(posts.length/postsPerPage)
  
  return (
    <div className="container mt-5">
      <Posts posts={currentPosts}/> 
      <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>

      <a
        href="#"
      >
      {"<< "}
      </a>

      <Button size="sm" variant='light' className="text-capitalize">
                                                
                                        <Badge variant="light" className="ml-1">1</Badge>
                                        </Button>

      <a
        href="#"
        
      >
        {" >>"}
      </a>
    </div>
    
  );
}

export default App;