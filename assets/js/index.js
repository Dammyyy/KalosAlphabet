const { useMemo, useState } = React;

function App() {
  const [items, setItems] = useState(() => (window.KalosItems || []).slice());
  const [sort, setSort] = useState({ key: '', isAsc: false });
  const [searchKalos, setSearchKalos] = useState('');

  const list = useMemo(() => {
    let next = items.slice();
    if (sort.key) {
      next.sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        return (av === bv ? 0 : av > bv ? 1 : -1) * (sort.isAsc ? 1 : -1);
      });
    }
    if (searchKalos) {
      next = next.filter((element) => String(element.Kalos || '').indexOf(searchKalos) > -1);
    }
    return next;
  }, [items, sort, searchKalos]);

  const sortBy = (key) => {
    setSort((prev) => ({ key, isAsc: prev.key === key ? !prev.isAsc : false }));
  };

  const sortedClass = (key) => (sort.key === key ? `sorted ${sort.isAsc ? 'asc' : 'desc'}` : '');

  const resetting = () => {
    setSort({ key: '', isAsc: false });
    setSearchKalos('');
    setItems((window.KalosItems || []).slice());
  };

  React.useEffect(() => {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, 'script', 'twitter-wjs');
  }, []);

  return (
    React.createElement('div', null,
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', { onClick: () => sortBy('Image'), className: sortedClass('Image') }, 'SS'),
            React.createElement('th', { onClick: () => sortBy('Kalos'), className: sortedClass('Kalos') }, 'カロス文字'),
            React.createElement('th', { onClick: () => sortBy('Estimation'), className: sortedClass('Estimation') }, '推定される文字'),
            React.createElement('th', { onClick: () => sortBy('Japanese'), className: sortedClass('Japanese') }, '日本語')
          )
        ),
        React.createElement('tbody', null,
          list.map((row) => (
            React.createElement('tr', { key: row.Id },
              React.createElement('td', null,
                React.createElement('a', { 'data-fancybox': 'gallery', href: row.Image, 'data-caption': row.Alt },
                  React.createElement('img', { src: row.Image, alt: row.Alt })
                )
              ),
              React.createElement('td', null,
                React.createElement('p', { className: 'galar' }, row.Galar),
                React.createElement('p', { className: 'hisui' }, row.Hisui),
                React.createElement('p', { className: 'kalos' }, row.Kalos),
                React.createElement('p', { className: 'text' }, row.Alt),
                React.createElement('p', { className: 'text' }, row.Text)
              ),
              React.createElement('td', null),
              React.createElement('td', null)
            )
          ))
        )
      )
    )
  );
}

const ReactDOMClient = window.ReactDOMClient || window.ReactDOM;
ReactDOMClient.createRoot(document.getElementById('app')).render(React.createElement(App));

