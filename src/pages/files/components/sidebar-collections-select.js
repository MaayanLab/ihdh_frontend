import { useReducer } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { StyledFormGroup } from "../../../common/styled-form-group";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SidebarCollectionItem } from "./sidebar-collection-item";
import { getUserCollections } from "../../../api/user";
import { getCollection } from "../../../api/collection";
import { CollectionExplorer } from "./sidebar-collection-item-2";

const groupCollections = (collections, currentOwner) => {
  const groupedMap = {
    ownedByMe: {
      label: "My files (Private)",
      collections: [],
    },
    public: {
      label: "Public",
      collections: [],
    },
    sharedWithMe: {
      label: "Shared with me",
      collections: [],
    },
  };

  for (const collection of collections) {
    if (collection.owner_id !== currentOwner) {
      groupedMap.sharedWithMe.collections.push(collection);
    } else if (collection.accessibility === "locked") {
      groupedMap.ownedByMe.collections.push(collection);
    } else if (collection.accessibility === "open") {
      groupedMap.public.collections.push(collection);
    }
  }
  return groupedMap;
};

export const SidebarSubMenu = ({ label, collections }) => {
  const [isOpen, toggleOpen] = useReducer((state) => !state, true);
  const childIds = collections
    .flatMap((collection) => {
      return collection.collections.map((id) => id.toString());
    })
    .filter((id) => id !== "2" && id !== "1");

  const joinedChildIds = childIds.join(",");
  const { data: childCollections } = useQuery(
    ["collection", joinedChildIds],
    () => getCollection(joinedChildIds),
    {
      enabled: !!joinedChildIds,
    }
  );
  const childCollectionsArray = childCollections
    ? childIds.length === 1
      ? [childCollections]
      : childCollections.collections
    : [];

  // const menuEntries = collections.reduce((accumulator, current) => {
  //   if (current.id === 1) {
  //     return accumulator;
  //   }
  //   return [
  //     ...accumulator,
  //     {
  //       id: current.id,
  //       name: current.name,
  //       children: [],
  //     },
  //   ];
  // }, []);

  // for (const entry of childCollectionsArray) {
  //   const parent = menuEntries.find(
  //     (collection) => collection.id === entry.parent_collection_id
  //   );
  //   parent?.children?.push(entry);
  // }
  const collection_dict = (collections || []).reduce((acc, i)=>({...acc, [i.id]: i}),{})
  const collection_hierarchy = []
  for (const collection of collections) {
    if (collection.collections.length) {
      collection.children = collection.collections.filter(id=>id !== collection.id).map(id=>collection_dict[id] || {})
    }
    // Root (self-referential parent_collection_id) is never shown as a
    // node itself - skip it here; its children are promoted to the top
    // level below instead.
    if (collection.id === collection.parent_collection_id) continue;
    if (collection_dict[collection.parent_collection_id] === undefined) collection_hierarchy.push(collection)
  }
  // If root is present in this bucket, its children belong at the top
  // level - otherwise they'd only be reachable by expanding a "root" node
  // that's never rendered, which is how they silently disappeared.
  const rootCollection = (collections || []).find(c => c.id === c.parent_collection_id);
  if (rootCollection?.children) {
    collection_hierarchy.push(
      // Root's children can span accessibility buckets other than this
      // one - collection_dict[id] falls back to {} for anything not in
      // *this* bucket, so filter those placeholders out along with root's
      // self-reference, or they'd render as blank rows.
      ...rootCollection.children.filter(
        (c) => c.id !== undefined && c.id !== rootCollection.id
      )
    );
  }
  return (
    <Box sx={{ margin: "20px 0", background: "#FAFAFA", borderRadius: "8px" }}>
      <ListItemButton onClick={toggleOpen}>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText>
          <Typography variant="modalTitle">{label}</Typography>
        </ListItemText>
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CollectionExplorer collections={collection_hierarchy}/>
      </Collapse>
    </Box>
  );
};

export const SidebarCollectionsSelect = ({ user }) => {
  const currentOwner = user.id;
  const {
    data: collections = [],
    isLoading,
    error,
  } = useQuery(["userCollections"], () => getUserCollections());

  const groupedCollections = groupCollections(collections, currentOwner);
  const filteredGroups = Object.values(groupedCollections).filter(
    ({ collections }) => collections.length > 0
  );

  if (isLoading) return "Loading...";
  if (error) return "There was a problem loading this page";

  return (
    <>
      <ListItemButton
        sx={{
          "&:hover": {
            background: "#FAFAFA",
          },
        }}
      >
        <ListItemText>
          <StyledFormGroup>
            <Box>
              <SidebarCollectionItem
                id={1}
                name="Unassigned"
                sx={{
                  margin: "15px auto",
                  width: "100%",
                }}
              />
            </Box>
          </StyledFormGroup>
        </ListItemText>
      </ListItemButton>
      {filteredGroups.map(({ label, collections }, i) => (
        <SidebarSubMenu key={i} label={label} collections={collections} />
      ))}
    </>
  );
};
