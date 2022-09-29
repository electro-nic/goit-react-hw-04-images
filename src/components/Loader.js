import { ProgressBar } from 'react-loader-spinner';


const Loader = () => {
  return (
    <div className="Loader">
      <ProgressBar height="180"  width="180"  ariaLabel="progress-bar-loading"  wrapperStyle={{}}  wrapperClass="progress-bar-wrapper"  borderColor = '#F4442E'  barColor = '#51E5FF'/>
    </div>
  );
};

export default Loader;
