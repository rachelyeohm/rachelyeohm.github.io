
import { Button} from 'antd';
import {
  LeftOutlined, 
} from '@ant-design/icons';

export const BackButton = ({onClick, color} : {onClick : any, color : string}) => {
    return <div>
    <Button type="primary" onClick={onClick} 
      style={{
        marginBottom: 16, 
        background : "#ffffff", 
        boxShadow: "0 0 0",
        color : color}}>
          <LeftOutlined/> Back
        </Button>
        </div>
}