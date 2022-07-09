import React, {FC, useEffect, useState} from 'react';
import {Col} from "antd";
import {User, Users} from "../App";
import axios from "axios";

type propsType = {
  queryUser: string
  setQueryUser: (e: string) => void
  setIsUsersLoading: (e: boolean) => void
  queryName: string
}

const List: FC<propsType> = (
  {
    queryUser,
    setQueryUser,
    setIsUsersLoading,
    queryName
  }) => {

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    setIsUsersLoading(true)
    axios.get<Users>(`https://api.github.com/search/users?q=${queryName}`)
      .then(res => {
        setUsers(res.data.items)
        setIsUsersLoading(false)
      })
  }, [queryName])

  return <Col md={24} lg={3}>
    <ul>
      {users.map(u =>
        <li
          style={queryUser === u.login ? {backgroundColor: 'rgba(24, 144, 255, 0.5)'} : {}}
          onClick={() => setQueryUser(u.login)}
          className='li'
          key={u.id}
        >
          {u.login}
        </li>
      )}
    </ul>
  </Col>
}

export default List;