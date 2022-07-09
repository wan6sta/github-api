import React, {FC, useState} from 'react';
import {Col, Input, Row} from "antd";

const {Search} = Input

type propsType = {
  isUsersLoading: boolean
  setQueryName: (e: string) => void
}

const Header: FC<propsType> = ({isUsersLoading, setQueryName}) => {

  const [inputValue, setInputValue] = useState<string>('')

  return <Row style={{marginBottom: '20px'}} justify="center">
    <Col xs={12} xl={6}>
      <Search
        onSearch={() => {
          if (!inputValue)
            return

          setQueryName(inputValue)
        }}
        loading={isUsersLoading}
        onChange={e => setInputValue(e.currentTarget.value)}
        value={inputValue}
        placeholder="Enter your login"
        enterButton size={'large'}/>
    </Col>
    <Col span={9}>

    </Col>
  </Row>
}

export default Header