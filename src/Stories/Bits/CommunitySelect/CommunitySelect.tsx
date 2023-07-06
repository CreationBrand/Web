
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import Box from '@mui/material/Box';
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { communityListData } from 'State/Data';
import { Controller } from 'react-hook-form';
import { useRecoilValue } from 'recoil';



const C = {
  container: css({
    background: '#181820',
    border: 'none !important',
    borderRadius: '8px',
    padding:'4px',
  })
}


const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Select All',
    flex: 1,

    sortable: false,
  },

];


export default function CommunitySelect({ control }: any) {

  const communityList = useRecoilValue(communityListData);
  if (!control) return null


  return (
    <Controller

      name="children"
      control={control}
      defaultValue=""
      rules={{ required: true }}
      render={({ field: { onChange, value } }) =>
        <Box sx={{ height: '160px' }}>
          <DataGrid
            css={C.container}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              onChange(newRowSelectionModel);
            }}
            rowSpacingType='margin'
            rowSelectionModel={value}
            getRowId={(row) => row.public_id}
            columnBuffer={2} columnThreshold={2}
            rows={communityList}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnFilter
            columnHeaderHeight={0}
            rowHeight={30}
            checkboxSelection
            hideFooter
            disableColumnMenu
            disableColumnSelector
          />
        </Box>

      } />

  );
}