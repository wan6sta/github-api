import React, {FC, useEffect, useState} from 'react'
import {Col, Input, Row, Spin} from 'antd'
import axios from 'axios'
import {Typography} from 'antd';

const {Title} = Typography;
const {Search} = Input

type User = {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

type Users = {
  items: User[]
}

const App: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)

  const [inputValue, setInputValue] = useState<string>('')
  const [currentFindUser, setCurrentFindUser] = useState<string>('wan6sta')
  const [userCurrentMark, setUserCurrentMark] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userFetchLoading, setUserFetchLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchUsers()
  }, [currentFindUser])

  useEffect(() => {
    fetchUser('wan6sta')
  }, [])

  async function fetchUsers() {
    try {
      setIsLoading(true)
      const response = await axios.get<Users>(`https://api.github.com/search/users?q=${currentFindUser}`)
      setUsers(response.data.items)
      setIsLoading(false)
    } catch (e) {
      alert(e)
    }
  }

  async function fetchUser(login: string) {
    try {
      setUserFetchLoading(true)
      setUserCurrentMark(login)
      const response = await axios.get<User>(`https://api.github.com/users/${login}`)
      setUser(response.data)
      setUserFetchLoading(false)
    } catch (e) {
      alert(e)
    }
  }

  return <>
    <Row style={{marginBottom: '20px'}} justify="center">
      <Col xs={12} xl={6}>
        <Search
          loading={isLoading}
          onSearch={() => setCurrentFindUser(inputValue)}
          onChange={e => setInputValue(e.currentTarget.value)}
          value={inputValue}
          placeholder="Enter your login"
          enterButton size={'large'}/>
      </Col>
      <Col span={9}>

      </Col>
    </Row>
    <Row justify="center">
      <Col xs={12} xl={6}>
        <ul>
          {users.map(user =>
            <li
              style={user.login === userCurrentMark ? {color: 'red'} : {}}
              className='li'
              key={user.id}
              onClick={() => {
                if (userCurrentMark === user.login) {
                  return
                }
                fetchUser(user.login)
              }}>{user.login}</li>
          )}
        </ul>
      </Col>
      <Col span={9}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '10px',
          justifyContent: 'center'
        }}>
          {userFetchLoading
            ? <Spin size="large"/>
            : <>

              <Title level={3}>{user?.login}</Title>
              <img style={{width: '300px'}} src={user?.avatar_url} alt="logo"/>
              <a target="_blank" href={user?.html_url}>{user?.html_url}</a>
            </>
          }
        </div>
      </Col>
    </Row>
  </>
}

export default App
