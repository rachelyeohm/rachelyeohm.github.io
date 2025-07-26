import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Row, Col, Card, Modal, Carousel } from 'antd';
import { Button} from 'antd';
import {
  LeftOutlined, 
} from '@ant-design/icons';
import { useState } from 'react';
import { Meta } from 'antd/es/list/Item';
import { Item } from '../utility/getCrochetItems';
import Masonry from 'react-masonry-css';


import { generateItems } from '../utility/getCrochetItems';

const items = generateItems();
const width = 300
const theme_color = "rgb(189, 149, 160)"
const theme_color_dark = "rgb(85, 47, 57)"


const breakpointColumnsObj = {
  default: 2, // 2 columns by default (for larger screens)
  768: 1,     // 1 column on screens <= 768px (for mobile)
};



function getItemById(id: number | undefined): Item | undefined {
  return items.find(item => item.id === id);
}

const ImageGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(1);
  let navigate = useNavigate();
  const navigateBack = ()=>navigate("/");

  const handleOpen = (id : number) => {
    setCurrentId(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentId(1);
  };
  return (
    <div>
      <Button type="primary" onClick={navigateBack} 
      style={{
        marginBottom: 16, 
        background : "#ffffff", 
        boxShadow: "0 0 0",
        color : theme_color_dark}}>
          <LeftOutlined/> Back
        </Button>
    <div style={{
    minHeight: "100vh", 
    width: "100vw",    
    display: "flex", 
    justifyContent: "center", 
    alignItems: "flex-start"
  }}>
      <div style={{width : "60vw", margin : "0 auto"}}>
      <div style = {{height : "20px"}}></div>
      <div>
        <a style={{display : "flex", 
              fontWeight : "bold",
              justifyContent : "center", 
              fontSize : 28,
              color : theme_color}}> Crochet Gallery ♡</a>

        <a style={{display : "flex", 
              justifyContent : "center", 
              fontSize : 12 ,
              color : "rgb(0, 0, 0)"}}> (Click each image for more!)</a>
      </div>
      <div style = {{height : "20px"}}></div>

      {/* GALLERY */}
      
          <Masonry
 
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
        {items.map((item, _) => (
          <div key={item.id} className="grid-item"
          style={{
 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "flex-start" ,
            padding : "20px"
          }} >
              <Card
                hoverable
                style={{ width: width }}
                cover={
                  <img style = {{
                        height : 'auto',
                        width: width,
                      maxWidth: '100%',
                      objectFit: 'contain',
                      }} 
                    alt={`Image ${item.id}`} 
                    src={item.front_image} />
                  
                  }
                onClick = {() => handleOpen(item.id)}
              >
                <Meta
                  style = {{
                        height : 'auto',
                        width: width,
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }} 
                description={item.description} />
              </Card>
            </div>))} 

        </Masonry>

     
      
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={600}
        styles={{

          content :  { backgroundColor: "rgb(232, 222, 219)" },
        }}
        
   
      >
        <ImageCarousel currentId = {currentId}/>
      </Modal>
       </div>
    </div>
    </div>
  );
};

export default ImageGrid;


const ImageCarousel = ({currentId} : {currentId : number}) => {

  const currentItem  = getItemById(currentId)
  const itemCount = currentItem?.images.length
  if (itemCount == undefined) {
    return <></>
  } else if (itemCount > 1  ) {
    return <Carousel arrows autoplay >
          {currentId &&
            currentItem!.images.map((src, idx) => (
              <div key={idx} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}>
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
            ))}
        </Carousel>
  } else {
    return <Carousel autoplay >
          {currentId &&
            currentItem!.images.map((src, idx) => (
              <div key={idx} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}>
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
            ))}
        </Carousel>
  }
}