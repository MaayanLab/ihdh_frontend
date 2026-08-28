import { Grid, Box, Typography } from "@mui/material";
import blobAv from "../../../image/blob-available-02.svg";
import minBlobAv from "../../../image/blob-available-03.svg";
import avaIcon from "../../../image/available-icon.svg";
import avaIcon1 from "../../../image/available-icon-1.svg";
import avaIcon2 from "../../../image/available-icon-2.svg";
import avaIcon3 from "../../../image/upload-icon.svg";
import Icon from '@mdi/react';
import { mdilFileMultiple, mdilChartPie, mdilFile, mdilArrangeSendToBack, mdilBank } from '@mdi/light-js';
import { useQuery } from "react-query";
import { getStats } from "../../../api/public";
import getReadableFileSizeString from "../../../common/readable-file-size";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#FAFAFA",
  paddingBottom: "120px",

  "& .titleSection": {
    fontSize: "clamp(28px, 4vw, 48px)",
  },
  "& .statsBox": {
    marginLeft: "clamp(12px, 2vw, 30px)",
  },
  "& .statsCollection": {
    fontSize: "clamp(20px, 2.5vw, 34px)",
  },
  "& .statsTitle": {
    fontSize: "clamp(16px, 1.6vw, 24px)",
  },

  [theme.breakpoints.down("lg")]: {
    paddingBottom: "20px",
    "& .gridContainer": {
      margin: "20px auto",
    },
    "& .boxImage1": {
      display: "none",
    },
    "& .boxImage2": {
      display: "none",
    },
    "& .statsBox": {
      marginRight: "15px",
    },
    "& .collectionIcons": {
      display: "none",
    },
  },
  [theme.breakpoints.up("md")]: {},
}));

const iconSize = "clamp(2rem, 4vw, 4.5rem)";
const statCellSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "clamp(12px, 2vw, 24px) clamp(8px, 1.5vw, 16px)",
  borderRight: "1px solid #B0C9CB",
};

export const AvailableData = () => {
  const { data: stats, isLoading, error } = useQuery("stats", getStats);

  if (isLoading) return "Loading...";
  if (error) return "There was a problem loading this page";

  return (
    <Container maxWidth="false" disableGutters={true}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Typography variant="subtitle1" className="titleSection">
          Available Data
        </Typography>
        <Box
          sx={{ position: "absolute", right: "22%", top: "-195px" }}
          className="boxImage1"
        >
          <img src={blobAv} alt="Blob with grandient" />
        </Box>
        <Box
          sx={{ position: "absolute", right: "15%", top: "-37px" }}
          className="boxImage2"
        >
          <img src={minBlobAv} alt="Blob with grandient" />
        </Box>
      </Box>

      <Grid
        container
        className="gridContainer"
        sx={{
          justifyContent: "center",
          background: "#EFF4F5",
          // maxWidth: "1150px",
          margin: "80px auto",
          padding: "clamp(16px, 3vw, 32px) clamp(16px, 5vw, 57px)",
          borderRadius: "8px",
        }}
      >
        <Grid item sm={2} sx={statCellSx}>
          {/* <img src={avaIcon2} alt="Icon" className="collectionIcons" /> */}
          <Icon path={mdilBank} size={iconSize} style={{color: "#42958d"}} />
          <Box className="statsBox">
            <Typography variant="subtitle3" className="statsCollection">
              36
            </Typography>
            <Typography variant="body2" className="statsTitle">
              Institutions
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={2} sx={statCellSx}>
          {/* <img src={avaIcon} alt="Icon" className="collectionIcons" /> */}
          <Icon path={mdilArrangeSendToBack} size={iconSize} style={{color: "#42958d"}} />
          <Box className="statsBox">
            <Typography variant="subtitle3" className="statsCollection">
              {stats.datasets}
            </Typography>
            <Typography variant="body2" className="statsTitle">
              Collections
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={2} sx={statCellSx}>
          {/* <img src={avaIcon2} alt="Icon" className="collectionIcons" /> */}
          <Icon path={mdilFile} size={iconSize} style={{color: "#42958d"}} />
          <Box className="statsBox">
            <Typography variant="subtitle3" className="statsCollection">
              {stats.files}
            </Typography>
            <Typography variant="body2" className="statsTitle">
              Files
            </Typography>
          </Box>
        </Grid>
        
        <Grid item sm={2} sx={statCellSx}>
          {/* <img src={avaIcon3} alt="Icon" className="collectionIcons" /> */}
          <Icon path={mdilFileMultiple} size={iconSize} style={{color: "#42958d"}} />
          <Box className="statsBox">
            <Typography variant="subtitle3" className="statsCollection">
              {stats.file_types}
            </Typography>
            <Typography variant="body2" className="statsTitle">
              File Types
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          sm={2}
          sx={{ ...statCellSx, borderRight: "none" }}
        >
          {/* <img src={avaIcon1} alt="Icon" className="collectionIcons" /> */}
          <Icon path={mdilChartPie} size={iconSize} style={{color: "#42958d"}} />
          <Box className="statsBox">
            <Typography variant="subtitle3" className="statsCollection">
              {getReadableFileSizeString(stats.size)}
            </Typography>
            <Typography variant="body2" className="statsTitle">
              Size
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
