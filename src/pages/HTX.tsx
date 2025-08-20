
import { Collapse } from "antd";
import { CollapseProps } from 'antd';
import footageImage from "../images/htx/footage.png"
import ensembleArchitecture from "../images/htx/ensemble_architecture.png"


const text = (items : CollapseProps['items']) => {
  return (
    <div style={{width:"60vw", display: 'flex' , justifyContent : "center", flexDirection:"column"}}>

      <a style={{fontSize:14, font:"Inter", fontWeight:400}}>
      <br/>
      <br/>
      Topics: Computer Vision, deep learning, video classification, image classification, pretraining, finetuning
      <br/>
      <br/>
      For my summer internship at Home Team's technology division (HTX), we were tasked to develop an end-to-end traffic violation detection system which took in public dashcam footage.

      Unfortunately, the dashcam footage quality looked like this:
      <br/>
      <br/>
      <img style={{width:"20vw"}} src={footageImage} alt="Example of footage"/>
      <br/>
      <br/>
      (it's self sourced)
      <br/>
      <br/>
      Anyways..


      </a>
      <Collapse items={items} ghost />


    </div>
  );
}
const HTX = () => {


  const ArchitectureText = (
   <>
      Since this was very early into the project, I got the chance to help architect how the models came together.

      <br/>
      <br/>
      Initially, we tried to train one supervised classifier to identify all traffic violations [pass each frame through Resnet50, combine features and pass through a few dense layers]. 
      So it would have 11 classes [10 kinds of violations + no violation],
      <br/>
      <br/>
      This failed.
      <br/>
      <br/>
      We realised we were putting too much faith in one small model to be able to detect all violations. 
      Therefore, we architected an ensemble system where each violation had a binary classifier, which would contribute to the final violation judgement.
      <br/>
      <br/>
      <img style={{width:"20vw"}} src={ensembleArchitecture} alt="Figure of ensemble architecture"/>
      <br/>
      <br/>
      {/* <Collapse items={[researchTextNest[0]]} />
      <br/>
      <Collapse items={[researchTextNest[1]]} /> */}
   </>
  )
  const Technologies = (
    <>
      I can't talk too much in detail about what I did (government stuff), so let me just list the technologies I tried out.
      <ul>
      <li>Base ResNet50 model</li>
      <li>Feature extraction of segmentation masks of vehicles, people, traffic lights, driveable areas with YOLOv11, and passing the features into a supervised classifier
      <li>Video Vision Language Model (VLM) with prompt tuning</li>
        <ul>
          <li>Qwen2.5-VL</li>
          <li>InternVLM</li>
        </ul>
      </li>
      <li>Finetuning image classifiers and combining predictions using rules</li>
        <ul>
          <li>ViT (Vision Transformers)</li>
        </ul>
      <li>Video Understanding models </li>
        <ul>
          <li>Finetuned ViViT (Video Vision Transformers)</li>
          <li>Pretraining VideoMAE further on car data (self-supervised), then finetuning</li>
          <li>Finetuning Timesformer</li>
        </ul>
    </ul>

    It was definitely an eye-opener into the various types of image and video classification technologies and the advantages and disadvantages of each.

    </>
  )

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <span style={{fontWeight:600, color:"var(--project-color)"}}>Architecture</span>,
      children: <p>{ArchitectureText}</p>,
    },
    {
      key: '2',
      label: <span style={{fontWeight:600, color:"var(--project-color)"}}>Technologies</span>,
      children: <p>{Technologies}</p>,
    },
  ];

  return text(items)
  
  
};
export default HTX;

