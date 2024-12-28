import {Button, Flex} from 'antd';
import {
  RightOutlined,
} from '@ant-design/icons';

export const MainButton = ({name, onClick} : {name : string, onClick : React.MouseEventHandler<HTMLElement>}) => {
  return (
    <Flex gap="small" wrap="wrap" style={{
        width: '100%',
      }}>
        <Button size="large" onClick = {onClick} block>
            {name}
            <RightOutlined/> 
        </Button>
    </Flex>
  )
}

