import qs from 'qs';

export default (url) => {
  const search = url.slice(url.indexOf('?') + 1, url.length);
  return qs.parse(search);
};
