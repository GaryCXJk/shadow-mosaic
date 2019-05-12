import React from 'react';

const filterProps = (props, filter) => {
  const filtered = {};
  Object.keys(props).forEach((prop) => {
    if (!filter.includes(prop)) {
      filtered[prop] = props[prop];
    }
  });
  return filtered;
};

const propsFilter = (InComponent, filter) => (props) => {
  const { children, ...filtered } = filterProps(props, filter);
  return (children ? (
    <InComponent {...filtered}>
      {children}
    </InComponent>
  ) : <InComponent {...filtered} />);
};

export default propsFilter;
