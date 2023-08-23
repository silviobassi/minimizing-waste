import { Button, Form, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ButtonFormProps {
  icon: { create?: any; edit?: any; cancel?: any };
  label: { save: string; cancel: string };
  link: {save?: string, cancel: string}
}

export default function ButtonForm(props: ButtonFormProps) {

  const navigate = useNavigate();

  return (
    <Form.Item style={{ marginTop: 40 }}>
      <Space direction="horizontal">
        <Button type="primary" icon={props.icon.create} htmlType={'submit'}>
          {props.label.save}
        </Button>
        <Button type="primary" danger icon={props.icon.cancel} onClick={() => navigate(props.link?.cancel)}>
          {props.label.cancel}
        </Button>
      </Space>
    </Form.Item>
  );
}
