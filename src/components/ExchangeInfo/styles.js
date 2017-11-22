const discountColor = '#40D512';
const remainderColor = '#8A9489';

export default {
  infoBlock: {
    paddingTop: '10px',
    height: '215px'
  },
  excessView: {
    extend: 'infoBlock',
    '& div': {
      height: '100%',
      fontSize: '150%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  errorView: {
    extend: 'infoBlock',
    '& div': {
      height: '100%',
      fontSize: '150%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  infoBlockDiagram: {
    extend: 'infoBlock'
  },
  infoBlockDetail: {
    extend: 'infoBlock',
    '& div': {
      margin: '10px 0'
    },
    '& hr': {
      width: '80%'
    }
  },
  calcHeading: {
    paddingTop: '10px',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  diagram: {
    margin: '0 auto',
    width: '300px',
  },
  diagramSum: {
    fontSize: '1.5em',
    marginBottom: '10px'
  },
  diagramBlock: {
    height: '50px',
    display: 'inline-block'
  },
  diagramDiscount: {
    extend: 'diagramBlock',
    backgroundColor: discountColor
  },
  diagramRemainder: {
    extend: 'diagramBlock',
    backgroundColor: remainderColor
  },
  diagramInfo: {
    paddingLeft: '20%'
  },
  diagramText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    margin: '5px 0'
  },
  discountText: {
    extend: 'diagramText',
    '& path': {
      fill: discountColor
    }
  },
  remainderText: {
    extend: 'diagramText',
    '& path': {
      fill: remainderColor
    }
  },
};
