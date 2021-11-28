
import Loader from 'react-js-loader';
import styled from 'styled-components';

const Styles = styled.div`
  .selector1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(158, 154, 154, 0.7);
    z-index: 1200;
  }
  .selector2 {
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
  }
  .selector3 {
    margin-top: 150px;
    font-size: 20px;
    color: darkblue;
  }
`;

function LoaderComponent ({title}) {
  return (
    
   <Styles>
              <div className="selector1">
                <div className="selector2">
                  <Loader
                    type={'rectangular-ping'}
                    bgColor={'#3f51b5'}
                    title={(title)?title:'Loading...'}
                    color={'#2a2a2a'}
                    size={300}
                  />
                  {/* <p className="selector3">
                    Loading...{page} page of {queryName}
                  </p> */}
                </div>
              </div>
            </Styles>
      
      
    
  );
}

export default LoaderComponent;

// import Loader from 'react-js-loader';
// import s from './Loader.module.css';

// function LoaderComponent() {
//   return (
//     <>
//       <Loader
//         type={'bubble-loop'}
//         bgColor={'#3f51b5'}
//         title={'Loading...'}
//         color={'#2a2a2a'}
//         size={300}
//       />
//       <p className={s.LoaderText}></p>
//     </>
//   );
// }

// export default LoaderComponent;