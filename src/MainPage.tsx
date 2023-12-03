import Card, { CardParams } from './components/Card';
import { Links } from './types/enums';
import { useSelector } from './redux/store';
import { FormFields } from './utils/validateForm';

const formsInfo: CardParams[] = [
  {
    formType: 'uncontrolled',
    link: `${Links.UNCONTROLLED}`,
    title: 'Uncontrolled Components Approach',
  },
  {
    formType: 'react-hook-form',
    link: Links.REACT_HOOK_FORM,
    title: 'React Hook Form Approach',
  },
];

function MainPage() {
  const uncontrolled = useSelector((state) => state.uncontrolled);
  return (
    <div className="main">
      <div className="main__formsInfo">
        {formsInfo.map((item) => (
          <Card key={item.link} {...item} />
        ))}
      </div>
      {uncontrolled.map((item, index) => (
        <p key={index}>{item[FormFields.NAME] as string}</p>
      ))}
    </div>
  );
}

export default MainPage;
