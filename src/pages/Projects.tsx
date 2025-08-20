import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Menu} from 'antd';
import type { MenuProps } from 'antd';
import { BackButton } from '../ui/BackButton.tsx';
import EEG from './EEG.tsx';
import HTX from './HTX.tsx';
import Fraud from './Fraud.tsx';
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (l : string, k : string) => {
    return {label : l, key : k};
}
const items : MenuItem[] = [
    getItem('EEG research', 'eeg'),
    getItem('HTX internship', 'htx'),
    getItem('AI Fraud Detection research', 'fraud'),
]

const Projects = () => {
  const [mode, setMode] = useState<'portrait' | 'horizontal'>('horizontal');
  const [collapsed, _] = useState<boolean>(false);
  const [openKey, setOpenKey] = useState<string>("eeg");
  let navigate = useNavigate();
  const navigateBack = ()=>navigate("/");

  useEffect(() => {
    const updateMode = () => {
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      if (isPortrait) {
        setMode('portrait');
      } else {
        setMode('horizontal');
      }
    };

    updateMode(); // Run once on mount
    window.addEventListener('resize', updateMode);

    return () => {
      window.removeEventListener('resize', updateMode);
    };
  }, []);
  
  const onClick : MenuProps['onClick'] = (e) => {
    
    setOpenKey(e.key);
  };
  return (
    <div className="projects" style={{ display: 'flex' , justifyContent : "center", width: '100vw'}}>
      <div>
        <BackButton onClick={navigateBack} color={"var(--project-color"}/>
        {mode == "portrait" && <Menu
          defaultSelectedKeys={['eeg']}
          defaultOpenKeys={['eeg']}
          onClick={onClick}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />}
        
      </div>
      <div style={{width: '100vw',  display : "flex", justifyContent : "center",flexDirection:"column", alignItems : "center"}}>
         {mode == "horizontal" && <Menu
          style ={{width:  "60vw",  display : "flex", justifyContent : "center"}}
          defaultSelectedKeys={['eeg']}
          defaultOpenKeys={['eeg']}
          onClick={onClick}
          mode="horizontal"
          items={items}
        />}
        {openKey === 'eeg' && <EEG/>}
        {openKey === 'htx' && <HTX/>}
        {openKey === 'fraud' && <Fraud/>}
      </div>
    </div>
  );
};
export default Projects;

