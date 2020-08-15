import * as React from 'react';

interface Props {
  onButtonClick: () => void
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="catalog__more">
      <button onClick={()=>props.onButtonClick()} className="catalog__button" type="button">Show more</button>
    </div>
  );
};



export default ShowMore;


