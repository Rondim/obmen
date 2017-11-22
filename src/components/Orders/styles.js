export default (theme) => {
  return {
    header: {
      fontSize: '120%',
      fontWeight: 'bold',
      color: '#303030',
      padding: '5px 0 0 0'
    },
    ordersList: {
      paddingTop: '10px'
    },
    paper: {
      height: '100%'
    },
    table: {
      margin: '0 auto'
    },
    thead: {
      textAlign: 'center'
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
    }
  };
};
