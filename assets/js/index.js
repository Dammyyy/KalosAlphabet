const items = [
  {'Id':'', 'Galar':'', 'Alt':'', 'Estimation':'', 'Japanese':'', 'Image':''},
];

new Vue({
  el: '#app',
  data: {
    items: items,
    sort: {
      key: '', // ソートキー
      isAsc: false // 昇順ならtrue,降順ならfalse
    },
    // types: types,       // チェックボックスの値
    // selectTypes: types,  // 選択されたチェックボックスの値
    searchKalos: '',   // 入力された文字列を格納
  },
  computed: {
    eventedAction: function() {
      let list = this.items.slice();

      // ソート実施
      if(this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      // Nameで検索実施
      if (this.searchKalos) {
        list = list.filter(element => {
          return Object.keys(element).some(key => {
            if(key === 'Kalos') {
              return element[key].indexOf(this.searchKalos) > -1;
            }
          });
        });
      }

      return list;
    }   
  },
  methods: {
    // sort用キーをセットし、昇順・降順を入れ替える
    sortBy: function(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    sortedClass: function(key) {
      return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
    },
    // 全ての処理をクリアする
    resetting: function() {
      this.sort.key = '';
      this.sort.isAsc = false;
      // this.selectTypes = types;
      this.searchKalos = '';
      this.items = items;
    }
  }
});
! function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    p = /^http:/.test(d.location) ? 'http' : 'https';
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document, 'script', 'twitter-wjs');

$('p.galar').css({'white-space':'pre-line'});
$('p.hisui').css({'white-space':'pre-line'});
$('p.kalos').css({'white-space':'pre-line'});
$('p.text').css({'white-space':'pre-line'});
