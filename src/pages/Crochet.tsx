import React from 'react';
import { Row, Col, Card, Modal, Carousel } from 'antd';
import { useState } from 'react';
import { Meta } from 'antd/es/list/Item';
import { Item } from '../utility/getCrochetItems';


import { generateItems } from '../utility/getCrochetItems';

const items = generateItems();
const width = 300


function getItemById(id: number | undefined): Item | undefined {
  return items.find(item => item.id === id);
}

const ImageGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(1);

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
      <div style = {{height : "20px"}}></div>
      <div>
        <h2 style={{display : "flex", justifyContent : "center", color : "rgb(255,122,186)"}}> Crochet Gallery ♡</h2>
      </div>
      <div style = {{height : "20px"}}></div>

      {/* GALLERY */}
      <div style={{height: "100vh" , width : "100vw" , display: "flex", justifyContent : "center"}}>
      
        <Row gutter={[30, 30]}>
        {items.map((item, index) => (
          <Col key={item.id} xs={24} sm={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              }}
            >
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
            </div>
          </Col>
        ))}
      </Row>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={600}
        bodyStyle={{ padding: 0 }}
      >
        <Carousel autoplay>
          {currentId &&
            getItemById(currentId)!.images.map((src, idx) => (
              <div key={idx}>
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
            ))}
        </Carousel>
      </Modal>
    </div>
    
  );
};

export default ImageGrid;
