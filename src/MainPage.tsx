import Card, { CardParams } from './components/Card';
import { Links } from './types/enums';
import { useSelector } from './redux/store';
import FilledFormCard from './components/FilledFormCard';

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
  const formResultsSlice = useSelector((state) => state.formResultsSlice);
  return (
    <div className="main">
      <div className="main__formsInfo">
        {formsInfo.map((item) => (
          <Card key={item.link} {...item} />
        ))}
      </div>
      <div className="main__formsInfo">
        <div className="uncontrolledCards">
          {formResultsSlice.uncontrolled.map((item) => (
            <FilledFormCard
              {...item}
              key={`${item.name}${item.country}${item.picture}`}
            />
          ))}
        </div>
        <div className="hookCards">
          {formResultsSlice.reactHook.map((item) => (
            <FilledFormCard
              {...item}
              key={`${item.name}${item.country}${item.picture}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
