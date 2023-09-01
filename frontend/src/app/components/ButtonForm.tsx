import { Button, Form, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useNavigate } from 'react-router-dom';

interface ButtonFormProps {
  icon: { create?: any; edit?: any; cancel?: any };
  label: { save: string; cancel: string };
  link: {save?: string, cancel: string}
  loading?: boolean
  redirect?: () => any
}

export default function ButtonForm(props: ButtonFormProps) {

  const navigate = useNavigate();
 const {xs, sm} = useBreakpoint()

 const isOrNotBlock = xs ? 'block' : ''

  return (
    <Form.Item style={{ marginTop: 40 }}>
      <Space size={'middle'} direction={xs ? 'vertical' : 'horizontal'} style={xs || sm ?  {width: '100%'} : {}}>
        <Button onClick={props.redirect} loading={props.loading} type="primary" icon={props.icon.create} htmlType={'submit'} block>
          {props.label.save}
        </Button>
        <Button type="primary" danger block icon={props.icon.cancel} onClick={() => navigate(props.link?.cancel)}>
          {props.label.cancel}
        </Button>
      </Space>
    </Form.Item>
  );
}
