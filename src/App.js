import { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [repos, setrepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [url, setUrl] = useState('');
  const [html_url, setHtmlUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/example`)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }, [])

  const setData = ({ 
    name, 
    login, 
    public_repos, 
    avatar_url,
    url,
    html_url
  }) => {
    setName(name)
    setUsername(login)
    setrepos(public_repos)
    setAvatar(avatar_url)
    setUrl(url)
    setHtmlUrl(html_url)
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if(data.message) {
          setError(data.message)
        }
        else {
        setData(data);
        setError(null);
        }
      })
  }


  return(
    <div className= "container">
      <div className='navbar'><i class='bx bxl-github' size='sm'></i>Github</div>
      <h1>
        Display any Github user's informations using Github's API
      </h1>
      <div className='search-bar'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Github User'
              name='user'
              onChange={handleSearch}
            />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>

      { error ? (
        <h1> { error } </h1>
      ) : (
        <div className='card'>
          <Card>
            <Image 
              src= {avatar}
              wrapped ui={false} 
            />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{username}</Card.Header>
              <a href={html_url} 
                 rel="noreferrer" 
                 target="_blank"
                 >{url}
              </a>
              </Card.Content>
              <Card.Content extra>
                <a href={html_url}
                   rel="noreferrer" 
                   target="_blank">
                  <Icon name='user' />
                  {repos} Repositories
                </a>
              </Card.Content>
          </Card>
        </div>
      )}
            <div class="footer__info-container">
                <span class="footer__copy">
                    &#169; Demo Website Created By <span class="Noor">Noraldeen Aljabari</span>. All rights reserved
                </span>
                <div class="footer__privacy">
                    <div href="#">Terms & Agreements</div>
                    <div href="#">Privacy Policy</div>
                </div>
            </div>
    </div>
  )

}

export default App;
