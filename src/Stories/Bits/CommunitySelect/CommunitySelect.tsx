import Box from '@mui/material/Box';
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { communityListData } from 'State/Data';
import { useRecoilValue } from 'recoil';


const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Select All',
    flex: 1,

    sortable: false,
  },

];


export default function CommunitySelect({ group, value, onChange }: any) {

  const communityList = useRecoilValue(communityListData);

  if (!group || !communityList) return (<div>asdf</div>)


  // console.log('communityList', communityList)




  return (
    <Box sx={{ height: '160px' }}>
      <DataGrid
        onRowSelectionModelChange={(newRowSelectionModel) => {
          onChange(newRowSelectionModel);
        }}
        rowSelectionModel={value}
        getRowId={(row) => row.public_id}
        columnBuffer={2} columnThreshold={2}
        rows={communityList}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnFilter
        columnHeaderHeight={40}
        rowHeight={30}
        checkboxSelection
        hideFooter
        disableColumnMenu
        disableColumnSelector
      />
    </Box>
  );
}