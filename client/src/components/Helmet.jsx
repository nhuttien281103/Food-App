const Helmet = ({ children, title }) => {
  document.title = 'Food App - ' + title;
  return children;
};

export default Helmet;
