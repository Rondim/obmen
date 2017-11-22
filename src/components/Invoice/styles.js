export default (theme) => {
  return {
    heading: {
      padding: '10px 0',
      fontWeight: 'bold'
    },
    invoiceBlock: {
      height: '215px'
    },
    errorView: {
      extend: 'invoiceBlock',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    invoice: {
      extend: 'invoiceBlock'
    },
    thead: {
      fontSize: '120%'
    },
    tbody: {
      fontSize: '120%'
    }
  };
}
