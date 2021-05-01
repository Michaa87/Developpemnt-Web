import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ClickAwayListener } from '@material-ui/core';
import Portal from '@material-ui/core/Portal';


const { useState } = React

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *+*': {
      marginTop: theme.spacing(2),
    },
  },

  dropdown: {
    position: 'fixed',
    width: 200,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  
  const classes = useStyles();

  const [pageId,setPageId] = useState(1)
  const [pageContent,setPageContent] = useState([])
  const [newPageContent,setNewPageContent] = useState([])
  const [open, setOpen] = useState(false);

  // pour gérer les pages
  const handleNewPage = () => {
    setPageContent(pageContent.concat([newPageContent]))
    setNewPageContent("Le contenu de la page " + pageId + "est " + "")
  }  


  // pour le Popup
  const handleClick =() => {
    setOpen((prev) => !prev);
  }

  const handleClickAway = () => {
    setOpen(false);
  }

  // pour la pagination
  const handleChange = (event, value) => {
    setPageId(value);
  }



  return (
    <div className="box">
      
      <h1>
       {pageContent[pageId-1]}  
      </h1>
    
      <div className={classes.root}>
        <Typography>Page: {pageId}</Typography>
        <Pagination count={100} page={pageId} onChange={handleChange} />
      </div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Fab color="primary" variant="extended" onClick={handleClick}>
            Ajouter une page
          </Fab>
          {open ? (
            <Portal>
              <div className={classes.dropdown}>
                You can add a new page
                <button onClick={() => {handleNewPage()}}>Nouvelle page(text) </button>
                <button onClick={() => {handleNewPage()}}>Nouvelle page(image) </button>
              </div>
            </Portal>
          ) : null}
        </div>
      </ClickAwayListener>
      <input
                  value = {newPageContent}
                  onChange={e=>setNewPageContent(e.target.value)}
                  onKeyDown={
                  e => {if (e.key === 'Enter') 
                  {handleNewPage()}}}/>

    </div>
  )
}

ReactDOM.render(<App />,
document.getElementById("root"))