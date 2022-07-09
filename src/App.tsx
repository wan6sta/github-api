import React, {FC, useState} from 'react'
import {Row} from "antd";

import Header from "./components/Header";
import List from "./components/List";
import UserCard from "./components/User";


export type User = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  bio: string
}

export type Users = {
  items: User[]
}


const App: FC = () => {

  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false)
  const [queryName, setQueryName] = useState<string>('wan6sta')
  const [queryUser, setQueryUser] = useState<string>('wan6sta')

  return <>
    <Header
      isUsersLoading={isUsersLoading}
      setQueryName={setQueryName}
    />

    <Row justify="center">
      <List
        queryUser={queryUser}
        setQueryUser={setQueryUser}
        setIsUsersLoading={setIsUsersLoading}

        queryName={queryName}
      />

      <UserCard
        queryUser={queryUser}
      />
    </Row>
  </>
}

export default App