import { useReducer } from "react";
import { getCollections } from "../../../api/collection";
import { useQuery } from "react-query";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { StyledFormGroup } from "../../../common/styled-form-group";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CollectionExplorer, SidebarCollectionItem } from "./sidebar-collection-item";

export const SidebarCollectionsSelect = () => {
  const [isOpen, toggleOpen] = useReducer((state) => !state, true);

  const {
    data: collections,
    isLoading,
    error,
  } = useQuery(["collections"], () => getCollections());
  if (isLoading) return "Loading...";
  if (error) return "There was a problem loading this page";
  const collection_dict = (collections || []).reduce((acc, i)=>({...acc, [i.id]: i}),{})
  
  const collection_hierarchy = []
  for (const collection of collections) {
    if (collection.collections.length) {
      collection.children = collection.collections.filter(id=>id !== collection.id).map(id=>collection_dict[id] || {})
    }
    if (collection.id === 1) collection_hierarchy.push(collection)
  }
  return (
    <>
      <ListItemButton onClick={toggleOpen}>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText>
          <Typography variant="modalTitle">Collection</Typography>
        </ListItemText>
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CollectionExplorer collections={(collection_hierarchy[0] || {}).children}/>
      </Collapse>
    </>
  );
};
