import React from 'react';
import { Row, Col, Card } from 'antd';
import { useState } from 'react';
import { Meta } from 'antd/es/list/Item';


import { generateItems } from '../utility/getCrochetItems';

const items = generateItems();
const width = 300

const ImageGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState<number>(3); // assume each item has 3 slides max

  const handleOpen = (folder: string) => {
    setCurrentFolder(folder);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentFolder(null);
  };
  return (
    <div>
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
                onClick = {() => handleOpen(item.front_image)}
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

    </div>
    
  );
};

export default ImageGrid;
