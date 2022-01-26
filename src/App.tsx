import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";

const getImageUrl = (imgId: any) => {
  switch (`${imgId}`) {
    case '1':
      return 'https://picsum.photos/id/1015/3000/2000';
    case '2':
      return 'https://picsum.photos/id/1016/3000/2000';
    case '3':
      return 'https://picsum.photos/id/1018/3000/2000';
    default:
      return '';
  }
};

function App() {
  const queryParams = window.location.search
    ? window.location.search
      .slice(1)
      .split('&')
      .map((s) => {
        const [key, value] = s.split('=');
        return {key, value};
      })
      .reduce((obj, curr) => {
        obj[curr.key] = decodeURIComponent(curr.value);
        return obj;
      }, {} as any)
    : {};
  const meta: any = {
    'og:title': 'test title',
    'og:description': 'test description'
  };
  if (queryParams.imgId) {
    meta['og:image'] = getImageUrl(queryParams.imgId);
  }
  const isOpenGraphKey = (key: string) => key && key.startsWith('og:');
  return (
    <div className="App">
      <header className="App-header">
        <h2>Test Facebook sharing</h2>
      </header>
      <Helmet>
        {Object.keys(meta).map(key => {
          const value = meta[key];
          if (value) {
            if (isOpenGraphKey(key)) {
              return <meta key={key} name={key} property={key} content={value} />;
            }
            return <meta key={key} name={key} content={value} />;
          }

          return null;
        })}
      </Helmet>
    </div>
  );
}

export default App;
