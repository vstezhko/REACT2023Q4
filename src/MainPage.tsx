import Card, { CardParams } from './components/Card';
import { Links } from './types/enums';

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
  return (
    <div className="main">
      <div className="main__formsInfo">
        {formsInfo.map((item) => (
          <Card key={item.link} {...item} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
