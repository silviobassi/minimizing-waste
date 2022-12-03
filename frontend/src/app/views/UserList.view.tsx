import { Button, Col, Divider, Row } from 'antd';
import UserList from "../features/UserList"
export default function UserListView() {
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button type={'primary'} size={'large'}>
            CRIAR COLABORADORES
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <UserList />
        </Col>
      </Row>
    </>
  );
}
