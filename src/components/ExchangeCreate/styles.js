export default (theme) => {
  return {
    root: {
      paddingTop: '10px',
      flexGrow: 1
    },
    // Orders
    ordersInput: {
      paddingTop: '10px'
    },
    paper: {
      height: '100%'
    },
    table: {
      margin: '0 auto'
    },
    thead: {
      textAlign: 'left'
    },
    buttonIcon: {
      transform: 'scale(1.5)'
    },
    removeButton: {
      minWidth: 0
    },
    removeButtonIcon: {
      extend: 'buttonIcon',
      color: 'orange'
    },
    addButtonIcon: {
      extend: 'buttonIcon',
      color: 'green'
    },

    // TotalWeight
    totalWeight: {
      padding: '0 10px',
      position: 'relative',
      top: '50%',
      transform: 'perspective(1px) translateY(-50%)'
    },

    // Exchange Button
    exchangeCalc: {
      display: 'inline-block'
    }

  };
};
