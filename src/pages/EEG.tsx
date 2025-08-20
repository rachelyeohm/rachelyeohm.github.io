
import { Collapse } from "antd";
import { CollapseProps } from 'antd';
import experimentImage from "../images/eeg/experiment.png"

const EEG = () => {


  const researchTextNest: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Evaluating the Effectiveness of Audio, Visual and Behavioural Calibrations on EEG-Based Relaxation Training, 2021',
    children: <p>
      Link : <a href={"https://link.springer.com/chapter/10.1007/978-981-15-9472-4_38"}>https://link.springer.com/chapter/10.1007/978-981-15-9472-4_38 </a>
      <br/>
      <br/>
      For my first foray into research, I evaluated and compared the effectiveness of different relaxation techniques by using machine learning to analyse subjects' brain waves. 
      While one might say they can just ask the subject, subjects each have their own personal ratings & preconceptions, making EEG a more objective way of finding the answer.
      <br/>
      <br/>
      Subjects were made to go through a "stressful" task, like mental math or listening to high-energy music, then go through one of three relaxation tasks - listening to relaxing audio, looking at calming pictures, or breathing exercises. 
      A SVM model was used to classify brain data into "relaxed" and "non-relaxed tasks". 
      If a relaxation task had a higher classification accuracy, it meant the model could distinguish it from stressful tasks better, making it a better relaxation technique.
      <br/>
      <br/>
      This project involved working with <u>signals / waves</u> a lot - Fourier Transform to isolate the different EEG frequency bands, Butterworth Bandpass filters, noise removal using different filters with different filter widths... 
      I learnt a lot about signal processing.
      <br/>
      <br/>
      Application wise, this is a step towards evaluating and developing more effective therapy methods. Relaxation calibration is also used in other EEG domains, in order to get the brain to a relaxed state before whatever experiment is done.
      <br/>
      <br/>
      Also, we got to collect our own data!
      <br/>
      <img style={{width:"30vw"}} src={experimentImage} alt="Picture of experimental setup"/>


    </p>,
  },

  {
    key: '2',
    label: 'Enhancing EEG-based emotion recognition using Semi-supervised Co-training Ensemble Learning, 2024',
    children: <p>
      Link : <a href={"https://ieeexplore.ieee.org/abstract/document/10605283"}>https://ieeexplore.ieee.org/abstract/document/10605283 </a>
      <br/>
      <br/>
      This project aims to solve two issues:
      <br/>
      <br/>
      One, existing models’ features often don't take advantage of the multiple dimensions of informations in EEG signals (i.e. temporal / frequency). We thus train separate CNN and DNN models on temporal and frequency features respectively,
      and use <u>weighted voting</u> to <u>ensemble</u> the results. 
      <br/>
      <br/>
      Two, emotion labels can be wrong/uncertain. Maybe a "happy" stimulus made the subject sad instead or did nothing for them ; maybe the same stimulus evokes different degrees of responses in different people. These intra-subject and inter-subject differences make labels unreliable.
      Thus, we use a <u>semisupervised method</u> that utilises data with uncertain labels as unlabelled data
      <br/>
      <br/>
      But how to determine which labels are uncertain? We use this heuristic: when the two models disagree on the prediction, the labels are uncertain. We then generate psuedolabels through weighted voting and put those back in the dataset.
      This is basically a variant of <u>co-training</u>.
      <br/>
      <br/>
      Results wise, <u>our combined model achieves higher accuracy than just the temporal or spectral model by 6.8% to 49.21%</u>, depending on dataset. This shows both the potential of the ensemble method and the semisupervised approach.

      <br/>
      <br/>
      One concern that I couldn't get over though was that if we don't know if emotion labels are correct, then how do we know the psuedolabels are correct as well? This might be good for future work.


    </p>,
  },
];

  const researchText = (
   <>
      My specific field of research is in <strong>emotion recognition</strong>. When the subject feels an emotion, the model automatically classifies it into one of several emotion classes the model is trained on.
      <br/>
      <br/>
      <Collapse items={[researchTextNest[0]]} />
      <br/>
      <Collapse items={[researchTextNest[1]]} />
   </>
  )
  const futureText = (
    <>
      Other than time and frequency components, EEG signals have a unique third dimension : the <strong>spatial</strong>  dimension. The position of a EEG channel in the brain may afford more information that can help increase classification accuracy. 
      <br/>
      <br/>
      I would love to do future work exploring the potential of combining these different dimensions.
      I've seen work on using graph neural networks to map this spatial dimension, and it would be interesting to explore that.
    </>
  )

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <span style={{fontWeight:600, color:"var(--project-color)"}}>Research publications</span>,
      children: <p>{researchText}</p>,
    },
    {
      key: '2',
      label: <span style={{fontWeight:600, color:"var(--project-color)"}}>Future work</span>,
      children: <p>{futureText}</p>,
    },
  ];
  
  return (
    <div style={{width:"60vw", display: 'flex' , justifyContent : "center", flexDirection:"column"}}>

      <a style={{fontSize:14, font:"Inter", fontWeight:400}}>
      <br/>
      <br/>
      Topics: EEG, deep learning, signal processing, semisupervised learning, co-training
      <br/>
      <br/>
      From 2020 to 2023, I researched on deep learning applied in the field of EEG brain waves. EEG (Electroencephalography) is a technique for recording brain waves. 
      I find this field of machine learning very underrated given its cool applications.
      <br/>
      <br/>
      For example, the alphabet p300 speller allows the patient to think of an alphabet on a screen, and the model is able to detect what alphabet the patient is thinking.
       Another example is motor imagery - the patient thinks of one of a few assigned movements, and the model detects which movement the patient is thinking. 
       This has been used in controlling exoskeletons, conducting rehabilitation for stroke patients etc etc...
      <br/>
      <br/>
      While there is a lot of ethical controversy over the more well-known genres of AI right now (like LLMs and AI image generators), I feel this is one field that has great potential for good.
      </a>
      <br/>

      <Collapse items={items} ghost />


    </div>
  );
};
export default EEG;

