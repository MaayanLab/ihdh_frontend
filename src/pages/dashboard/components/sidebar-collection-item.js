import viewIcon from "../../../image/view-icon.svg";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useReducer, useState } from "react";
import { ViewDetailCollection } from "./view-detail-collection";
import { ViewModal } from "../../../common/view-modal";
import { useNavigate } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
export const SidebarCollectionItem = (collection) => {
  const [isEditModalOpen, toggleEditModal] = useReducer(
    (state) => !state,
    false
  );
  console.log(collection)
  const [open, setOpen] = useState(false);

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
        {/* {(open & collection.children.length) ? <Button><ExpandLess /></Button>: <Button><ExpandMore /></Button>} */}
        {/* <div style={{ width: "200px", whiteSpace: "nowrap" }}>
          <Box
            component="div"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Tooltip title={collection.name}>
              <FormControlLabel
                control={
                  <Checkbox onClick={() => navigate(`/collection/${collection.id} `)} />
                }
                label={collection.name}
                sx={{
                  maxWidth: "197px",
                  whitespace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              />
            </Tooltip>
          </Box>
        </div> */}
        {collection.children && <IconButton onClick={handleClick}>{open?<ExpandLess/>:<ExpandMore/>}</IconButton>}
        <Tooltip title="View Details">
          <IconButton variant="view" onClick={toggleEditModal}>
            <img src={viewIcon} alt="View icon" style={{ margin: "0 6px" }} />
          </IconButton>
        </Tooltip>
        
        {collection.files.length ? <Link href={`/collection/${collection.id}`}>
          <Typography sx={{
                  maxWidth: "120px",
                  textWrap: "balance",
                }} variant="body1">{collection.name.replace(/_/g, " ")}</Typography>
        </Link>:
        <Typography sx={{
                  maxWidth: "120px",
                  textWrap: "balance",
                }} variant="body1">{collection.name.replace(/_/g, " ")}</Typography>
        }
        {collection.files.length ? <Typography variant="countFilter">{collection.files.length}</Typography>: null}
        
      </Stack>
      {(collection.children) && <Collapse in={open} timeout="auto" unmountOnExit>
          <CollectionExplorer collections={collection.children}/>
      </Collapse>}
      <ViewModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title={`Collection - "${collection.name}" `}
      >
        <ViewDetailCollection
          id={collection.id}
        />
      </ViewModal>
    </Box>
  );
};

export const CollectionExplorer = ({collections=[]}) => {
  if (collections.length === 0) return null
  else {
    return (
    <List disablePadding>
      {collections.map(collection=>(
        <ListItem key={collection.id}>
          <SidebarCollectionItem {...collection}/>
        </ListItem>
      ))}
    </List>
    )
  }
}