import {
  Box,
  Collapse,
  IconButton,
  List,
  Stack,
  Typography,
  Button,
  ListItemIcon
} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import { useReducer, useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSearchParams } from "react-router-dom";
import folderIcon from "../../../image/folder-icon.svg";
import folderBlackIcon from "../../../image/folder-black-icon.svg";

export const SidebarCollectionItem = (collection) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const getCollectionId = searchParams.get("collectionId");
  const activeButton = Number(getCollectionId);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      key={collection.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"flex-start"}>
        {activeButton === collection.id ? (
          <img
            src={folderBlackIcon}
            alt="folder icon"
            
          />
        ) : (
          <img
            src={folderIcon}
            alt="folder icon"
          />
        )}
        <Button onClick={()=>setSearchParams({collectionId: collection.id})}>
          <Typography sx={{
                  maxWidth: "120px",
                  whitespace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }} variant="body1">{collection.name}</Typography>
        </Button>
        {/* {collection.files.length ? <Typography variant="countFilter">{collection.files.length}</Typography>: null} */}
        {collection.children && <IconButton onClick={handleClick}>{open?<ExpandLess/>:<ExpandMore/>}</IconButton>}
        
      </Stack>
      {(collection.children) && <Collapse in={open} timeout="auto" unmountOnExit>
          <CollectionExplorer collections={collection.children}/>
      </Collapse>}
    </Box>
  );
};

export const CollectionExplorer = ({collections=[]}) => {
  const [searchParams] = useSearchParams();

  const getCollectionId = searchParams.get("collectionId");
  const activeButton = Number(getCollectionId);

  if (collections.length === 0) return null
  else {
    return (
    <List disablePadding>
      {collections.map(collection=>(
        <ListItemButton selected={collection.id === activeButton} key={collection.id}>
          
          <SidebarCollectionItem {...collection}/>
        </ListItemButton>
      ))}
    </List>
    )
  }
}