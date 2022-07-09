import React, {FC, useEffect, useState} from 'react';
import {Col, Spin, Typography} from "antd";
import {User} from "../App";
import axios from "axios";


const {Title} = Typography

type propsType = {
  queryUser: string
}

const UserCard: FC<propsType> = (
  {
    queryUser
  }) => {

  const [user, setUser] = useState<User | null>(null)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsUserLoading(true)
    axios.get<User>(`https://api.github.com/users/${queryUser}`)
      .then(res => {
        setUser(res.data)
        setIsUserLoading(false)
      })
  }, [queryUser])

  return <Col className='colRow' md={24} lg={21}>
    {isUserLoading
      ? <Spin size="large"/>
      : <>
        <Title level={3}>{user?.login}</Title>
        <img style={{width: '300px'}} src={user?.avatar_url} alt="logo"/>
        <p>{user?.bio}</p>
        <a target="_blank" href={user?.html_url}>{user?.html_url}</a>
      </>
    }
  </Col>
}

export default UserCard